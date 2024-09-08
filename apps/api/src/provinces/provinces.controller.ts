import { Controller, Get, Param } from '@nestjs/common';
import { ProvincesService } from './provinces.service';
import { Province } from './entities/province.entity';
import { Public } from '../decorators/public.decorator';

@Controller('provinces')
export class ProvincesController {
  constructor(private readonly provincesService: ProvincesService) {}

  @Public()
  @Get()
  findAll(): Promise<Province[]> {
    return this.provincesService.findAll();
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: number): Promise<Province> {
    return this.provincesService.findOne(id);
  }
}
