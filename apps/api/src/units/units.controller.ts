import { Controller, Get } from '@nestjs/common';
import { UnitsService } from './units.service';
import { Unit } from './entities/unit.entity';
import { Public } from '../decorators/public.decorator';

@Controller('units')
export class UnitsController {
  constructor(private readonly unitsService: UnitsService) {}

  @Public()
  @Get()
  findAll(): Promise<Unit[]> {
    return this.unitsService.findAll();
  }
}
