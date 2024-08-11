import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { County } from './entities/county.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CountiesService {
  constructor(
    @InjectRepository(County)
    private countiesRepository: Repository<County>,
  ) {}

  findAll(): Promise<County[]> {
    return this.countiesRepository.find({ relations: ['province'] });
  }

  findOne(id: number): Promise<County> {
    return this.countiesRepository.findOne({
      where: { id },
      relations: ['province'],
    });
  }

  findByProvince(provinceId: number): Promise<County[]> {
    return this.countiesRepository.find({
      where: { province: { id: provinceId } },
      relations: ['province'],
    });
  }
}
