import { Roles } from './../decorators/roles.decorator';
import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  ParseIntPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { Role } from '../@types/roles.enum';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/profile')
  async findByToken(@Request() req) {
    const userId = req.user.sub;
    return this.userService.findOne(userId);
  }

  @Patch('/profile')
  async updateOwnProfile(@Body() updateUserDto: UpdateUserDto, @Request() req) {
    const userId = req.user.sub;
    return this.userService.updateUser(userId, updateUserDto);
  }

  @Get()
  @Roles(Role.Admin, Role.SuperAdmin)
  findAll() {
    return this.userService.findAllUser();
  }

  @Patch(':id')
  @Roles(Role.Admin, Role.SuperAdmin)
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  @Roles(Role.Admin, Role.SuperAdmin)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.userService.removeUser(id);
  }
}
