import { IsString, IsNotEmpty, IsEnum } from 'class-validator';
import { IsValidNationalCode } from '../../decorators/isValidNationalCode.decorator';

export class CreateUserDto {
  @IsString({ message: 'نام باید به صورت رشته باشد.' })
  @IsNotEmpty({ message: 'وارد کردن نام الزامی است.' })
  name: string;

  @IsString({ message: 'نام خانوادگی باید به صورت متن باشد.' })
  @IsNotEmpty({ message: 'وارد کردن نام خانوادگی الزامی است.' })
  lastName: string;

  @IsString({ message: 'نام کاربری باید به صورت متن باشد.' })
  @IsNotEmpty({ message: 'وارد کردن نام کاربری الزامی است.' })
  username: string;

  @IsString({ message: 'رمز عبور باید به صورت رشته باشد.' })
  @IsNotEmpty({ message: 'وارد کردن رمز عبور الزامی است.' })
  password: string;

  @IsNotEmpty({ message: 'وارد کردن کد ملی الزامی است.' })
  @IsValidNationalCode({ message: 'کد ملی نامعتبر است.' })
  nationalCode: string;

  @IsString({ message: 'درجه باید به صورت رشته متنی باشد.' })
  rank: string;

  @IsEnum(['admin', 'user', 'employee'], { message: 'نقش وارد شده صحیح نیست' })
  role: string;
}
