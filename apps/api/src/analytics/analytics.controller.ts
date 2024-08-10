import { AuthGuard } from './../auth/guards/auth.guard';
import { Role } from './../@types/roles.enum';
import { RolesGuard } from './../auth/guards/role.guard';
import { Controller, Get, UseGuards } from '@nestjs/common';
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
}
