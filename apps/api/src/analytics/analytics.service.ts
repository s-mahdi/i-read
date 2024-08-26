import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { AnalyticsData } from '../@types/analytics.interface';

@Injectable()
export class AnalyticsService {
  constructor(private readonly userService: UserService) {}

  async getAnalytics(): Promise<AnalyticsData> {
    const users = await this.userService.findAllUser();
    const totalUsers = users.length;

    const currentWeek = this.getWeekNumber(new Date());
    const usersThisWeek = users.filter(
      (user) => this.getWeekNumber(new Date(user.createdAt)) === currentWeek,
    ).length;

    const registrationProgress = Math.round((usersThisWeek / totalUsers) * 100);

    const last30DaysCount = this.getLast30DaysRegistrationCount(users);

    return {
      totalUsers,
      registrationProgress,
      usersThisWeek,
      last30DaysCount,
    };
  }

  private getWeekNumber(d: Date): number {
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    const dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1)).getTime();
    return Math.ceil(((d.getTime() - yearStart) / 86400000 + 1) / 7);
  }

  private getLast30DaysRegistrationCount(users: any[]) {
    const today = new Date();
    const last30Days = Array.from({ length: 30 }, (_, i) => {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      return date.toISOString().split('T')[0]; // Format the date as YYYY-MM-DD
    });

    const last30DaysCount = last30Days.map((date) => {
      const count = users.filter((user) => {
        const userDate = new Date(user.createdAt).toISOString().split('T')[0];
        return userDate === date;
      }).length;
      return { date, count };
    });

    return last30DaysCount.reverse();
  }
}
