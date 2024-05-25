import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Query,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { VersesService } from './verses.service';
import { UpdateVerseDto } from './dto/update-verse.dto';
import { SchedulesService } from '../schedules/schedules.service';

@Controller('verses')
export class VersesController {
  constructor(
    private readonly versesService: VersesService,
    private readonly schedulesService: SchedulesService
  ) {}

  @Get()
  findAll(@Query('page') page = 1, @Query('pageSize') pageSize = 50) {
    return this.versesService.findAll(Number(page), pageSize);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.versesService.findOne(+id);
  }

  @Get('by-schedule/:scheduleId')
  async findBySchedule(
    @Param('scheduleId') scheduleId: string,
    @Query('pageSize') pageSize = 50
  ) {
    try {
      const schedule = await this.schedulesService.findOne(+scheduleId);
      if (!schedule) {
        throw new NotFoundException(`Schedule with id ${scheduleId} not found`);
      }
      const startVerseId = schedule.startVerseId;
      const verses = await this.versesService.findVersesByStartId(
        startVerseId,
        Number(pageSize)
      );
      if (!verses || verses.length === 0) {
        throw new NotFoundException(
          `No verses found starting from verse id ${startVerseId}`
        );
      }
      return verses;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      } else {
        throw new InternalServerErrorException(
          'An unexpected error occurred while fetching verses'
        );
      }
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVerseDto: UpdateVerseDto) {
    return this.versesService.update(+id, updateVerseDto);
  }
}
