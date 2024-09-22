import { AuthGuard } from './../auth/guards/auth.guard';
import { Role } from './../@types/roles.enum';
import { RolesGuard } from './../auth/guards/role.guard';
import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { Roles } from '../decorators/roles.decorator';

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
  getProvincesAnalytics(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
    @Query('sort') sort = 'provinceName',
    @Query('order') order: 'ASC' | 'DESC' = 'ASC',
  ) {
    return this.analyticsService.getProvincesAnalytics({
      page,
      limit,
      sort,
      order,
    });
  }
}
