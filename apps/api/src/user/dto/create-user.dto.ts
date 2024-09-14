import {
  IsString,
  IsNotEmpty,
  Matches,
  IsEnum,
  IsOptional,
  IsNumber,
} from 'class-validator';
import { IsValidNationalCode } from '../../decorators/isValidNationalCode.decorator';
import { IsValidPhoneNumber } from '../../decorators/isValidPhoneNumber.decorator';
import { Role } from '../../@types/roles.enum';

const noFarsiRegEx =
  /^[^\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF\u0600-\u06FF\u06F0-\u06F9]+$/;

export class CreateUserDto {
  @IsString({ message: 'نام باید به صورت رشته باشد.' })
  @IsNotEmpty({ message: 'وارد کردن نام الزامی است.' })
  name: string;

  @IsString({ message: 'نام خانوادگی باید به صورت متن باشد.' })
  @IsNotEmpty({ message: 'وارد کردن نام خانوادگی الزامی است.' })
  lastName: string;

  @IsValidPhoneNumber()
  @IsNotEmpty({ message: 'وارد کردن شماره تلفن الزامی است' })
  username: string;

  @IsString({ message: 'رمز عبور باید به صورت رشته باشد.' })
  @IsNotEmpty({ message: 'وارد کردن رمز عبور الزامی است.' })
  @Matches(noFarsiRegEx, {
    message: 'رمز عبور نباید شامل کاراکترهای فارسی باشد.',
  })
  password: string;

  @IsNotEmpty({ message: 'وارد کردن کد ملی الزامی است.' })
  @IsValidNationalCode({ message: 'کد ملی نامعتبر است.' })
  nationalCode: string;

  @IsEnum(Role)
  @IsOptional()
  role?: Role;

  @IsOptional()
  @IsNumber({}, { message: 'شناسه استان باید عدد باشد.' })
  province?: number;

  @IsOptional()
  @IsNumber({}, { message: 'شناسه شهرستان باید عدد باشد.' })
  county?: number;

  @IsOptional()
  @IsNumber({}, { message: 'شناسه واحد باید عدد باشد.' })
  unit?: number;
}
