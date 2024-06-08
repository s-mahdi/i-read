import { NestFactory } from '@nestjs/core';
import * as dotenv from 'dotenv';
import axios from 'axios';
import axiosRetry from 'axios-retry';
import { EntityManager } from 'typeorm';
import { Verse } from './verses/entities/verse.entity';
import { AppModule } from './app/app.module';
import { join } from 'path';
import * as fs from 'fs';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

dotenv.config({ path: join(__dirname, '../.env') });

const requiredVariables = [
  'LIARA_ENDPOINT',
  'LIARA_ACCESS_KEY',
  'LIARA_SECRET_KEY',
  'LIARA_BUCKET_NAME',
  'STATIC_FILES_BASE_URL',
];

const missingVariables = requiredVariables.filter(
  (variable) => !(variable in process.env),
);

if (missingVariables.length > 0) {
  console.error(
    `Error: Required environment variables are missing: ${missingVariables.join(
      ', ',
    )}`,
  );
  process.exit(1);
}

const MAX_CONCURRENT_REQUESTS = 50;
const TIMEOUT = 10000; // 10 seconds
const RETRIES = 3;

axiosRetry(axios, {
  retries: RETRIES,
  retryDelay: (retryCount) => axiosRetry.exponentialDelay(retryCount),
  retryCondition: (error) => {
    return error.code === 'ECONNABORTED' || error.response?.status === 404;
  },
});

async function findAndUploadMissingAudioFiles() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const missingFiles: string[] = [];

  try {
    const entityManager = app.get(EntityManager);
    const verseRepository = entityManager.getRepository(Verse);
    const verses = await verseRepository.find();

    for (let i = 0; i < verses.length; i += MAX_CONCURRENT_REQUESTS) {
      const chunk = verses.slice(i, i + MAX_CONCURRENT_REQUESTS);
      await Promise.all(
        chunk.map((verse) => processVerse(verse, missingFiles)),
      );
    }

    if (missingFiles.length > 0) {
      await uploadMissingFiles(missingFiles);
    } else {
      console.log('No missing audio files.');
    }
  } catch (error) {
    console.error('Error processing audio files:', error);
  } finally {
    await app.close();
  }
}

async function processVerse(verse: Verse, missingFiles: string[]) {
  const missingFile = await checkAudioFile(verse.audioUrl);
  if (missingFile) {
    console.log(`Missing audio file: ${missingFile}`);
    missingFiles.push(missingFile);
  }
}

async function checkAudioFile(url: string): Promise<string | null> {
  try {
    const response = await axios.head(url, { timeout: TIMEOUT });
    if (response.status === 200) {
      return null;
    }
  } catch (error) {
    return url;
  }
  return null;
}

async function uploadMissingFiles(missingFiles: string[]) {
  const client = new S3Client({
    region: 'default',
    endpoint: process.env.LIARA_ENDPOINT,
    credentials: {
      accessKeyId: process.env.LIARA_ACCESS_KEY,
      secretAccessKey: process.env.LIARA_SECRET_KEY,
    },
  });

  for (const fileUrl of missingFiles) {
    const fileName = fileUrl.split('/').pop();
    if (fileName) {
      const localAudioPath = join(__dirname, 'assets/audio', fileName);
      if (fs.existsSync(localAudioPath)) {
        await uploadAudioToCloud(fileName, localAudioPath, client);
      } else {
        console.error(`Local audio file not found: ${localAudioPath}`);
      }
    }
  }
}

async function uploadAudioToCloud(
  fileName: string,
  filePath: string,
  client: S3Client,
) {
  const params = {
    Body: fs.createReadStream(filePath),
    Bucket: process.env.LIARA_BUCKET_NAME,
    Key: `quran-audio/${fileName}`,
  };

  try {
    await client.send(new PutObjectCommand(params));
    console.log(`Uploaded ${fileName} to the cloud.`);
  } catch (error) {
    console.error('Error uploading audio file to the cloud:', error);
  }
}

findAndUploadMissingAudioFiles();
