import { PartialType } from '@nestjs/mapped-types';
import { CreateVerseDto } from './create-verse.dto';

export class UpdateVerseDto extends PartialType(CreateVerseDto) {}
