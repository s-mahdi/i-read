import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Verse } from './entities/verse.entity';
import { Repository } from 'typeorm';
import * as fs from 'fs';
import * as readline from 'readline';
import { UpdateVerseDto } from './dto/update-verse.dto';
import { join } from 'path';
import { zipAsync } from '../functions/zipAsync';
import { quranIndex } from '../assets/quranIndex';

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

  async importVersesFromFiles(): Promise<{
    success: boolean;
    message: string;
  }> {
    try {
      // Clear the table before importing new verses
      await this.verseRepository.delete({});

      const basePath =
        '/Users/mahdi/Work/man-quran-mikhanam/quran/apps/api/src/assets';
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
      for await (const [originalLine, translationLine] of zipAsync(
        originalLines,
        translationLines
      )) {
        console.log('Importing verse:', i + 1);
        const [suraId, order, translation] = translationLine.split('|');
        const verse = new Verse();
        verse.id = i + 1; // Assuming line number starts at 1
        verse.suraId = parseInt(suraId);
        verse.order = parseInt(order);
        verse.translation = translation;
        verse.text = originalLine.split('|')[2];
        verse.audioUrl = `https://github.com/semarketir/quranjson/blob/master/source/audio/${this.padWithZeros(
          suraId,
          3
        )}/${this.padWithZeros(order, 3)}.mp3`;
        const id = parseInt(suraId) - 1;
        verse.sura = quranIndex[id].titleAr;

        console.log('Verse object:', verse);

        try {
          await this.verseRepository.save(verse);
          console.log('Verse saved successfully');
        } catch (error) {
          console.error('Error saving verse:', error);
        }

        i++;
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
