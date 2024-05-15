import {
  IsString,
  IsNotEmpty,
  IsEnum,
  Matches,
  IsArray,
  ArrayUnique,
  IsNumber,
} from 'class-validator';
import { IsValidNationalCode } from '../../decorators/isValidNationalCode.decorator';

const passwordRegEx =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;

export class CreateUserDto {
  @IsString({ message: 'نام باید به صورت رشته باشد.' })
  @IsNotEmpty({ message: 'وارد کردن نام الزامی است.' })
  name: string;

  @IsString({ message: 'نام خانوادگی باید به صورت متن باشد.' })
  @IsNotEmpty({ message: 'وارد کردن نام خانوادگی الزامی است.' })
  lastName: string;

  @IsString({ message: 'نام کاربری باید به صورت متن باشد.' })
  @IsNotEmpty({ message: 'وارد کردن نام کاربری الزامی است.' })
  @Matches(/^\d+$/, { message: 'نام کاربری باید یک رشته عددی باشد.' })
  username: string;

  @IsString({ message: 'رمز عبور باید به صورت رشته باشد.' })
  @IsNotEmpty({ message: 'وارد کردن رمز عبور الزامی است.' })
  // @Matches(passwordRegEx, {
  //   message:
  //     'رمز عبور باید بین ۸ تا ۲۰ کاراکتر باشد و شامل حداقل یک حرف بزرگ، یک حرف کوچک، یک عدد و یک نویسه خاص باشد.',
  // })
  password: string;

  @IsNotEmpty({ message: 'وارد کردن کد ملی الزامی است.' })
  @IsNumber({}, { message: 'کد ملی باید به صورت عدد باشد.' })
  @IsValidNationalCode({ message: 'کد ملی نامعتبر است.' })
  nationalCode: number;

  @IsString({ message: 'درجه باید به صورت رشته متنی باشد.' })
  rank: string;

  @IsEnum(['admin', 'user', 'employee'], { message: 'نقش وارد شده صحیح نیست' })
  role: string;
}
