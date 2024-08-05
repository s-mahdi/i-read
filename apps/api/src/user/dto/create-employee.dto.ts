import {
  IsString,
  IsNotEmpty,
  Matches,
  Length,
  IsEnum,
  IsOptional,
} from 'class-validator';
import { IsValidNationalCode } from '../../decorators/isValidNationalCode.decorator';
import { Role } from '../entities/roles.enum';

const noFarsiRegEx =
  /^[^\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF\u0600-\u06FF\u06F0-\u06F9]+$/;

export class CreateEmployeeDto {
  @IsString({ message: 'نام باید به صورت رشته باشد.' })
  @IsNotEmpty({ message: 'وارد کردن نام الزامی است.' })
  name: string;

  @IsString({ message: 'نام خانوادگی باید به صورت متن باشد.' })
  @IsNotEmpty({ message: 'وارد کردن نام خانوادگی الزامی است.' })
  lastName: string;

  @IsString({ message: 'نام کاربری باید به صورت متن باشد.' })
  @IsNotEmpty({ message: 'وارد کردن نام کاربری الزامی است.' })
  @Length(9, 9, { message: 'نام کاربری باید دقیقاً 9 کاراکتر باشد.' })
  @Matches(/^40\d{7}$/, {
    message: 'نام کاربری باید با 40 شروع شود و به دنبال آن 7 رقم باشد.',
  })
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

  @IsString({ message: 'درجه باید به صورت رشته متنی باشد.' })
  rank: string;

  @IsEnum(Role)
  @IsOptional()
  role?: Role;
}
