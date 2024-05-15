import { ForgetPasswordDto } from './../user/dto/forget-password.dto';
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService
  ) {}

  async login(username: string, pass: string): Promise<any> {
    const user = await this.userService.findOneByUserName(username);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const payload = { username: user.username, sub: user.id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async signup(signUpDto: CreateUserDto): Promise<any> {
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
      throw new NotFoundException('User not found');
    }
    if (user.nationalCode !== nationalCode) {
      throw new UnauthorizedException('Invalid national code');
    }
    await this.userService.updatePassword(user.id, newPassword);
  }
}
