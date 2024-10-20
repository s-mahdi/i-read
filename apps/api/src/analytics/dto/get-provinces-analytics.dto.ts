import { IsOptional, IsString } from 'class-validator';

export class GetProvincesAnalyticsDto {
  @IsOptional()
  @IsString()
  range?: string = '[0, 49]';

  @IsOptional()
  @IsString()
  sort?: string = '["id","ASC"]';
}
