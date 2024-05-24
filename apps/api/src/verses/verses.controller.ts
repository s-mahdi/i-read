import { Controller, Get, Body, Patch, Param, Query } from '@nestjs/common';
import { VersesService } from './verses.service';
import { UpdateVerseDto } from './dto/update-verse.dto';

@Controller('verses')
export class VersesController {
  constructor(private readonly versesService: VersesService) {}

  @Get()
  findAll(@Query('page') page = 1, @Query('pageSize') pageSize = 50) {
    return this.versesService.findAll(Number(page), pageSize);
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.versesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVerseDto: UpdateVerseDto) {
    return this.versesService.update(+id, updateVerseDto);
  }
}
