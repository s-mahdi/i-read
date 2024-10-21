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
  BadRequestException,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { Role } from '../@types/roles.enum';
import { GetUsersDto } from './dto/get-users.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Roles(Role.Admin, Role.SuperAdmin)
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findOne(id);
  }

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
  async findAll(@Query() query: GetUsersDto) {
    const { range, sort } = query;

    // Parse range
    let page = 1;
    let perPage = 50;
    if (range) {
      try {
        const [start, end] = JSON.parse(range);
        perPage = end - start + 1;
        page = Math.floor(start / perPage) + 1;
      } catch {
        throw new BadRequestException('Invalid range format');
      }
    }

    // Parse sort
    let sortField = 'id';
    let sortOrder: 'ASC' | 'DESC' = 'ASC';
    if (sort) {
      try {
        const [field, order] = JSON.parse(sort);
        sortField = field;
        sortOrder = order.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
      } catch {
        throw new BadRequestException('Invalid sort format');
      }
    }

    return this.userService.findAllUser({
      page,
      limit: perPage,
      sort: sortField,
      order: sortOrder,
    });
  }

  @Patch(':id')
  @Roles(Role.Admin, Role.SuperAdmin)
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateEmployeeDto,
  ) {
    return this.userService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  @Roles(Role.Admin, Role.SuperAdmin)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.userService.removeUser(id);
  }
}
