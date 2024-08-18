import { Module } from '@nestjs/common';
import { ProvincesService } from './provinces.service';
import { ProvincesController } from './provinces.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Province } from './entities/province.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Province])],
  providers: [ProvincesService],
  controllers: [ProvincesController],
  exports: [ProvincesService],
})
export class ProvincesModule {}
