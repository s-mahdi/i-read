import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { AnalyticsData } from '../@types/analytics.interface';
import {
  getWeekNumber,
  getLast30DaysRegistrationCount,
} from '../helpers/analytics-helpers';

@Injectable()
export class AnalyticsService {
  constructor(private readonly userService: UserService) {}

  async getAnalytics(): Promise<AnalyticsData> {
    try {
      const users = await this.userService.findAllUser();
      const totalUsers = users.length;
      const currentWeek = getWeekNumber(new Date());

      const usersThisWeek = users.reduce((count, user) => {
        return getWeekNumber(new Date(user.createdAt)) === currentWeek
          ? count + 1
          : count;
      }, 0);

      const registrationProgress = totalUsers
        ? Math.round((usersThisWeek / totalUsers) * 100)
        : 0;

      const last30DaysCount = getLast30DaysRegistrationCount(users);

      return {
        totalUsers,
        registrationProgress,
        usersThisWeek,
        last30DaysCount,
      };
    } catch (error) {
      console.error('Error fetching analytics data:', error);
      throw new Error('Failed to fetch analytics data');
    }
  }
}
