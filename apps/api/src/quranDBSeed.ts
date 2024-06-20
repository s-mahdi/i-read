import { NestFactory } from '@nestjs/core';
import { join } from 'path';
import fs from 'fs';
import dotenv from 'dotenv';
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
  'STATIC_FILES_BASE_URL',
];

const checkEnvironmentVariables = () => {
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
};

const readFileLines = (filePath) => {
  return fs.readFileSync(filePath, 'utf-8').split('\n');
};

const padWithZeros = (number, length) => {
  return number.toString().padStart(length, '0');
};

const createVerse = (
  index,
  suraId,
  order,
  translation,
  originalLine,
  audioUrl,
) => {
  const verse = new Verse();
  verse.id = index + 1;
  verse.suraId = parseInt(suraId, 10);
  verse.order = parseInt(order, 10);
  verse.translation = translation;
  verse.text = originalLine.split('|')[2];
  verse.audioUrl = audioUrl;

  const suraIndex = parseInt(suraId, 10) - 1;
  verse.sura = quranIndex[suraIndex].titleAr;

  return verse;
};

const seedQuranDatabase = async () => {
  checkEnvironmentVariables();

  const app = await NestFactory.createApplicationContext(AppModule);

  try {
    const entityManager = app.get(EntityManager);
    const verseRepository = entityManager.getRepository(Verse);
    await verseRepository.clear();

    const basePath = join(__dirname, 'assets');
    const originalFilePath = join(basePath, 'ara-quranuthmanienc.txt');
    const translationFilePath = join(basePath, 'fas-abdolmohammaday.txt');

    const originalLines = readFileLines(originalFilePath);
    const translationLines = readFileLines(translationFilePath);

    const audioDir = join(__dirname, 'assets/audio');
    if (!fs.existsSync(audioDir)) {
      fs.mkdirSync(audioDir, { recursive: true });
    }

    const verses = [];

    for (
      let i = 0;
      i < Math.min(originalLines.length, translationLines.length);
      i++
    ) {
      const originalLine = originalLines[i];
      const translationLine = translationLines[i];

      const [suraId, order, translation] = translationLine.split('|');
      const audioFileName = `${padWithZeros(suraId, 3)}-${padWithZeros(order, 3)}.mp3`;
      const audioUrl = `${process.env.STATIC_FILES_BASE_URL}${audioFileName}`;

      const verse = createVerse(
        i,
        suraId,
        order,
        translation,
        originalLine,
        audioUrl,
      );
      verses.push(verse);
    }

    await verseRepository.save(verses);

    console.log('Database seeding complete.');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await app.close();
  }
};

seedQuranDatabase();
