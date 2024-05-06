import { Module } from '@nestjs/common';
import { VersesService } from './verses.service';
import { VersesController } from './verses.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Verse } from './entities/verse.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Verse])],
  controllers: [VersesController],
  providers: [VersesService],
  exports: [VersesService],
})
export class VersesModule {}
