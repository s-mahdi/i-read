import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Verse } from './entities/verse.entity';
import { Between, Repository } from 'typeorm';
import { UpdateVerseDto } from './dto/update-verse.dto';

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

  async findVersesByStartId(
    startVerseId: number,
    pageSize: number
  ): Promise<Verse[]> {
    return this.verseRepository
      .createQueryBuilder('verse')
      .where('verse.id >= :startVerseId', { startVerseId })
      .orderBy('verse.id', 'ASC')
      .take(pageSize)
      .getMany();
  }
}
