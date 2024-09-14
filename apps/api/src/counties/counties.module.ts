import { Module } from '@nestjs/common';
import { CountiesService } from './counties.service';
import { CountiesController } from './counties.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { County } from './entities/county.entity';
import { Province } from '../provinces/entities/province.entity';

@Module({
  imports: [TypeOrmModule.forFeature([County, Province])],
  controllers: [CountiesController],
  providers: [CountiesService],
  exports: [CountiesService, TypeOrmModule],
})
export class CountiesModule {}
