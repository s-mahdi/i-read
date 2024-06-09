import { IsString, IsNotEmpty, Matches } from 'class-validator';
import { IsValidNationalCode } from 'src/decorators/isValidNationalCode.decorator';
import { IsValidPhoneNumber } from 'src/decorators/isValidPhoneNumber.decorator';

const noFarsiRegEx =
  /^[^\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF\u0600-\u06FF\u06F0-\u06F9]+$/;

export class CreateUserDto {
  @IsString({ message: 'نام باید به صورت رشته باشد.' })
  @IsNotEmpty({ message: 'وارد کردن نام الزامی است.' })
  name: string;

  @IsString({ message: 'نام خانوادگی باید به صورت متن باشد.' })
  @IsNotEmpty({ message: 'وارد کردن نام خانوادگی الزامی است.' })
  lastName: string;

  @IsValidPhoneNumber({ message: 'شماره تلفن اشتباه است' })
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
}
