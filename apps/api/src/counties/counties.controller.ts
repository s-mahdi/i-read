import { Controller, Get, Param } from '@nestjs/common';
import { CountiesService } from './counties.service';
import { County } from './entities/county.entity';
import { Public } from '../decorators/public.decorator';

@Controller('counties')
export class CountiesController {
  constructor(private readonly countiesService: CountiesService) {}

  @Public()
  @Get()
  findAll(): Promise<County[]> {
    return this.countiesService.findAll();
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: number): Promise<County> {
    return this.countiesService.findOne(id);
  }

  @Public()
  @Get('province/:provinceId')
  findByProvince(@Param('provinceId') provinceId: number): Promise<County[]> {
    return this.countiesService.findByProvince(provinceId);
  }
}
