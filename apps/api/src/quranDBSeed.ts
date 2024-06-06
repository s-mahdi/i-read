import { NestFactory } from '@nestjs/core';
import { join } from 'path';
import * as fs from 'fs';
import * as readline from 'readline';
import * as dotenv from 'dotenv';
import { zipAsync } from './utils/zipAsync';
import { quranIndex } from './assets/quranIndex';
import axios from 'axios';
import { EntityManager } from 'typeorm';
import { Verse } from './verses/entities/verse.entity';
import { AppModule } from './app/app.module';

dotenv.config({ path: join(__dirname, '../.env') });

const requiredVariables = [
  'DB_NAME',
  'DB_HOST',
  'DB_USERNAME',
  'DB_PASSWORD',
  'DB_PORT',
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

async function seedQuranDatabase() {
  const app = await NestFactory.createApplicationContext(AppModule);

  try {
    const entityManager = app.get(EntityManager);
    const verseRepository = entityManager.getRepository(Verse);
    await verseRepository.clear();

    const basePath = join(__dirname, 'assets');
    const originalFilePath = join(basePath, 'ara-quranuthmanienc.txt');
    const translationFilePath = join(basePath, 'fas-abolfazlbahramp.txt');

    const originalFile = readline.createInterface({
      input: fs.createReadStream(originalFilePath),
      output: process.stdout,
      terminal: false,
    });

    const translationFile = readline.createInterface({
      input: fs.createReadStream(translationFilePath),
      output: process.stdout,
      terminal: false,
    });

    const originalLines = readLines(originalFile);
    const translationLines = readLines(translationFile);

    let i = 0;
    const audioDir = join(__dirname, 'assets/audio');
    if (!fs.existsSync(audioDir)) {
      fs.mkdirSync(audioDir, { recursive: true });
    }

    const promises = [];
    const verses = [];

    // Use zipAsync to iterate over lines in parallel
    for await (const [originalLine, translationLine] of zipAsync(
      originalLines,
      translationLines,
    )) {
      const [suraId, order, translation] = translationLine.split('|');
      const audioFileName = `${padWithZeros(suraId, 3)}-${padWithZeros(
        order,
        3,
      )}.mp3`;
      const audioUrl = `https://github.com/semarketir/quranjson/raw/master/source/audio/${padWithZeros(
        suraId,
        3,
      )}/${padWithZeros(order, 3)}.mp3`;
      const localAudioPath = join(audioDir, audioFileName);

      const verse = new Verse();
      verse.id = i + 1; // Assuming line number starts at 1
      verse.suraId = parseInt(suraId);
      verse.order = parseInt(order);
      verse.translation = translation;
      verse.text = originalLine.split('|')[2];

      const fileName = `${padWithZeros(suraId, 3)}-${padWithZeros(
        order,
        3,
      )}.mp3`;
      verse.audioUrl = `/audio/${fileName}`;

      const id = parseInt(suraId) - 1;
      verse.sura = quranIndex[id].titleAr;

      verses.push(verse);

      if (!fs.existsSync(localAudioPath)) {
        promises.push(downloadAudio(audioUrl, localAudioPath));
      }

      i++;
    }

    // Wait for all downloads to complete
    await Promise.all(promises);

    // Save all verses after the files are downloaded
    await verseRepository.save(verses);

    console.log('Database seeding complete.');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await app.close();
  }
}

function padWithZeros(number: string, length: number): string {
  return number.padStart(length, '0');
}

async function* readLines(rl: readline.Interface): AsyncIterable<string> {
  for await (const line of rl) {
    yield line;
  }
}

async function downloadAudio(url: string, path: string) {
  const response = await axios({
    method: 'get',
    url,
    responseType: 'stream',
    timeout: 600000,
  });

  response.data.pipe(fs.createWriteStream(path));
  return new Promise((resolve, reject) => {
    response.data.on('end', () => resolve(path));
    response.data.on('error', reject);
  });
}

seedQuranDatabase();
