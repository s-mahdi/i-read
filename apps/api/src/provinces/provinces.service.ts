import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Province } from './entities/province.entity';

@Injectable()
export class ProvincesService {
  constructor(
    @InjectRepository(Province)
    private provincesRepository: Repository<Province>,
  ) {}

  findAll(): Promise<Province[]> {
    return this.provincesRepository.find({ relations: ['counties'] });
  }

  findOne(id: number): Promise<Province> {
    return this.provincesRepository.findOne({
      where: { id },
      relations: ['counties'],
    });
  }
}
