import { AuthGuard } from './../auth/guards/auth.guard';
import { Role } from './../@types/roles.enum';
import { RolesGuard } from './../auth/guards/role.guard';
import {
  BadRequestException,
  Controller,
  Get,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { Roles } from '../decorators/roles.decorator';
import { GetProvincesAnalyticsDto } from './dto/get-provinces-analytics.dto';

@Controller('analytics')
@UseGuards(RolesGuard, AuthGuard)
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get()
  @Roles(Role.Admin, Role.SuperAdmin)
  getAnalytics() {
    return this.analyticsService.getAnalytics();
  }

  @Get('provinces')
  @Roles(Role.Admin, Role.SuperAdmin)
  getProvincesAnalytics(@Query() query: GetProvincesAnalyticsDto) {
    let page = 1;
    let perPage = 50;
    if (query.range) {
      try {
        const [start, end] = JSON.parse(query.range);
        perPage = end - start + 1;
        page = Math.floor(start / perPage) + 1;
      } catch (error) {
        throw new BadRequestException('Invalid range format');
      }
    }

    let sort = 'id';
    let order: 'ASC' | 'DESC' = 'ASC';
    if (query.sort) {
      try {
        const [sortField, sortOrder] = JSON.parse(query.sort);
        sort = sortField;
        if (sortOrder.toUpperCase() === 'DESC') {
          order = 'DESC';
        }
      } catch (error) {
        throw new BadRequestException('Invalid sort format');
      }
    }

    console.log('Parsed Parameters: ', { page, perPage, sort, order });

    return this.analyticsService.getProvincesAnalytics({
      page,
      limit: perPage,
      sort,
      order,
    });
  }
}
