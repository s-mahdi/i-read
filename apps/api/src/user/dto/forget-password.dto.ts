import { IsNotEmpty, IsNumber, IsString, Matches } from 'class-validator';
import { IsValidNationalCode } from '../../decorators/isValidNationalCode.decorator';

export class ForgetPasswordDto {
  @IsString({ message: 'نام کاربری باید به صورت متن باشد.' })
  @IsNotEmpty({ message: 'وارد کردن نام کاربری الزامی است.' })
  @Matches(/^\d+$/, { message: 'نام کاربری باید یک رشته عددی باشد.' })
  username: string;

  @IsNotEmpty({ message: 'وارد کردن کد ملی الزامی است.' })
  @IsNumber({}, { message: 'کد ملی باید به صورت عدد باشد.' })
  @IsValidNationalCode({ message: 'کد ملی نامعتبر است.' })
  nationalCode: string;

  @IsString({ message: 'رمز عبور باید به صورت رشته باشد.' })
  @IsNotEmpty({ message: 'وارد کردن رمز عبور الزامی است.' })
  newPassword: string;
}
