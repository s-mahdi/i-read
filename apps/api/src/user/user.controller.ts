import { Roles } from './../decorators/roles.decorator';
import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  Request,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { Role } from '../@types/roles.enum';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @Roles(Role.Admin, Role.SuperAdmin)
  findAll() {
    return this.userService.findAllUser();
  }

  @Get('/profile')
  async findByToken(@Request() req) {
    const userId = req.user.sub;
    const user = await this.userService.findOne(userId);
    return user;
  }

  @Get(':id')
  @Roles(Role.Admin, Role.SuperAdmin)
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  @Roles(Role.Admin, Role.SuperAdmin)
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateUser(+id, updateUserDto);
  }

  @Delete(':id')
  @Roles(Role.Admin, Role.SuperAdmin)
  remove(@Param('id') id: string) {
    return this.userService.removeUser(+id);
  }
}
