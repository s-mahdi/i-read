import { Controller, Get, Param } from '@nestjs/common';
import { CountiesService } from './counties.service';
import { County } from './entities/county.entity';

@Controller('counties')
export class CountiesController {
  constructor(private readonly countiesService: CountiesService) {}

  @Get()
  findAll(): Promise<County[]> {
    return this.countiesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<County> {
    return this.countiesService.findOne(id);
  }

  @Get('province/:provinceId')
  findByProvince(@Param('provinceId') provinceId: number): Promise<County[]> {
    return this.countiesService.findByProvince(provinceId);
  }
}
