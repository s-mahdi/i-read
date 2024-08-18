import { Module } from '@nestjs/common';
import { CountiesService } from './counties.service';
import { CountiesController } from './counties.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { County } from './entities/county.entity';

@Module({
  imports: [TypeOrmModule.forFeature([County])],
  controllers: [CountiesController],
  providers: [CountiesService],
  exports: [CountiesService],
})
export class CountiesModule {}
