import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
  InternalServerErrorException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { CreateEmployeeDto } from 'src/user/dto/create-employee.dto';
import { ForgetPasswordDto } from 'src/user/dto/forget-password.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async login(username: string, pass: string): Promise<any> {
    try {
      const user = await this.userService.findOneByUserName(username);

      if (!user) {
        throw new NotFoundException(
          'کاربر با این نام کاربری یافت نشد. لطفا ثبت‌نام کنید',
        );
      }

      if (user.password !== pass) {
        throw new UnauthorizedException('نام کاربری یا کلمه عبور صحیح نیست');
      }

      const payload = {
        username: user.username,
        sub: user.id,
        role: user.role,
      };
      return {
        access_token: this.jwtService.sign(payload),
      };
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof UnauthorizedException
      ) {
        throw error;
      }
      throw new InternalServerErrorException(
        'مشکلی در سرور رخ داده است. لطفاً بعداً دوباره تلاش کنید.',
      );
    }
  }

  async signup(signUpDto: CreateUserDto): Promise<any> {
    const user = await this.userService.createUser(signUpDto);
    const payload = { username: user.username, sub: user.id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async signupEmployee(signUpDto: CreateEmployeeDto): Promise<any> {
    const user = await this.userService.createUser(signUpDto);
    const payload = { username: user.username, sub: user.id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async resetPassword({
    username,
    nationalCode,
    newPassword,
  }: ForgetPasswordDto): Promise<void> {
    const user = await this.userService.findOneByUserName(username);
    if (!user) {
      throw new NotFoundException(
        'اطلاعات وارد شده صحیح نیست یا کاربری با مشخصات وارد شده وجود ندارد',
      );
    }
    if (user.nationalCode !== nationalCode) {
      throw new UnauthorizedException(
        'اطلاعات وارد شده صحیح نیست یا کاربری با مشخصات وارد شده وجود ندارد',
      );
    }
    await this.userService.updatePassword(user.id, newPassword);
  }
}
