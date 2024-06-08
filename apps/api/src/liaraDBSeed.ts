import { NestFactory } from '@nestjs/core';
import { join } from 'path';
import * as fs from 'fs';
import * as readline from 'readline';
import * as dotenv from 'dotenv';
import { zipAsync } from './utils/zipAsync';
import { quranIndex } from './assets/quranIndex';
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
    const verses = [];

    for await (const [originalLine, translationLine] of zipAsync(
      originalLines,
      translationLines,
    )) {
      const [suraId, order, translation] = translationLine.split('|');
      const audioFileName = `${padWithZeros(suraId, 3)}-${padWithZeros(
        order,
        3,
      )}.mp3`;
      const audioUrl = `${process.env.STATIC_FILES_BASE_URL}${audioFileName}`;
      const verse = new Verse();
      verse.id = i + 1;
      verse.suraId = parseInt(suraId);
      verse.order = parseInt(order);
      verse.translation = translation;
      verse.text = originalLine.split('|')[2];
      verse.audioUrl = audioUrl;

      const id = parseInt(suraId) - 1;
      verse.sura = quranIndex[id].titleAr;

      verses.push(verse);

      i++;
    }

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

seedQuranDatabase();
