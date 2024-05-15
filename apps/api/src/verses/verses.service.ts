import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Verse } from './entities/verse.entity';
import { Between, Repository } from 'typeorm';
import * as fs from 'fs';
import * as readline from 'readline';
import { UpdateVerseDto } from './dto/update-verse.dto';
import { join } from 'path';
import { zipAsync } from '../utils/zipAsync';
import { quranIndex } from '../assets/quranIndex';
import axios from 'axios';

@Injectable()
export class VersesService {
  constructor(
    @InjectRepository(Verse)
    private verseRepository: Repository<Verse>
  ) {}

  async findAll(page = 1, pageSize = 50): Promise<Verse[]> {
    const skip = (page - 1) * pageSize;
    const take = pageSize;
    return this.verseRepository.find({
      skip,
      take,
      order: {
        id: 'ASC',
      },
    });
  }

  findOne(id: number): Promise<Verse> {
    return this.verseRepository.findOne({ where: { id } });
  }
  update(id: number, verse: UpdateVerseDto) {
    return verse;
  }

  async getSuraListFromStartVerseId(
    startVerseId: number,
    count: number
  ): Promise<string[]> {
    const verses = await this.verseRepository.find({
      where: { id: Between(startVerseId, startVerseId + count - 1) },
      order: { id: 'ASC' },
    });
    const uniqueSuras = new Set(verses.map((verse) => verse.sura));
    return Array.from(uniqueSuras);
  }

  async downloadAudio(url, path) {
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

  async importVersesFromFiles(): Promise<{
    success: boolean;
    message: string;
  }> {
    try {
      await this.verseRepository.delete({});

      const basePath = join(__dirname, '../api/assets');
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

      const originalLines = this.readLines(originalFile);
      const translationLines = this.readLines(translationFile);

      let i = 0;
      const audioDir = join(__dirname, '../api/assets/audio');
      if (!fs.existsSync(audioDir)) {
        fs.mkdirSync(audioDir, { recursive: true });
      }

      const promises = [];
      const verses = [];

      for await (const [originalLine, translationLine] of zipAsync(
        originalLines,
        translationLines
      )) {
        const [suraId, order, translation] = translationLine.split('|');
        const audioFileName = `${this.padWithZeros(
          suraId,
          3
        )}-${this.padWithZeros(order, 3)}.mp3`;
        const audioUrl = `https://github.com/semarketir/quranjson/raw/master/source/audio/${this.padWithZeros(
          suraId,
          3
        )}/${this.padWithZeros(order, 3)}.mp3`;
        const localAudioPath = join(audioDir, audioFileName);

        const verse = new Verse();
        verse.id = i + 1; // Assuming line number starts at 1
        verse.suraId = parseInt(suraId);
        verse.order = parseInt(order);
        verse.translation = translation;
        verse.text = originalLine.split('|')[2];

        const fileName = `${this.padWithZeros(suraId, 3)}-${this.padWithZeros(
          order,
          3
        )}.mp3`;
        verse.audioUrl = `/audio/${fileName}`;

        const id = parseInt(suraId) - 1;
        verse.sura = quranIndex[id].titleAr;

        verses.push(verse);

        if (!fs.existsSync(localAudioPath)) {
          promises.push(this.downloadAudio(audioUrl, localAudioPath));
        }

        i++;
      }

      // Wait for all downloads to complete
      await Promise.all(promises);

      // Save all verses after the files are downloaded
      for (const verse of verses) {
        try {
          await this.verseRepository.save(verse);
        } catch (error) {
          console.error('Error saving verse:', error);
        }
      }

      return { success: true, message: 'Verses imported successfully.' };
    } catch (error) {
      return {
        success: false,
        message: `Error importing verses: ${error.message}`,
      };
    }
  }

  private async *readLines(rl: readline.Interface): AsyncIterable<string> {
    for await (const line of rl) {
      yield line;
    }
  }

  private padWithZeros(number: string, length: number): string {
    return number.padStart(length, '0');
  }
}
