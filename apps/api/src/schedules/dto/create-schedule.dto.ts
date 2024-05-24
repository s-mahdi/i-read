import {
  IsDateString,
  IsBoolean,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { User } from '../../user/entities/user.entity';

export class CreateScheduleDto {
  @IsDateString()
  date: string;

  @IsBoolean()
  isRead: boolean;

  @IsNumber()
  startVerseId: number;

  @IsString({ each: true })
  suraList: string[];

  @ValidateNested()
  @Type(() => User)
  user: User;
}
