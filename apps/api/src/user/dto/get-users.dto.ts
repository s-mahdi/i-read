import { IsOptional, IsString, Matches } from 'class-validator';

export class GetUsersDto {
  @IsOptional()
  @IsString()
  @Matches(/^\[\d+,\d+\]$/, {
    message: 'Range must be a valid JSON array of two numbers',
  })
  range?: string = '[0,49]';

  @IsOptional()
  @IsString()
  @Matches(/^\["\w+",\s*"(ASC|DESC)"\]$/, {
    message: 'Sort must be a valid JSON array with field and order',
  })
  sort?: string = '["id","ASC"]';
}
