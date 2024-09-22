import { Injectable } from '@nestjs/common';
import { AnalyticsData } from '../@types/analytics.interface';
import {
  getLast30DaysRegistrationCount,
  getStartOfWeek,
} from '../helpers/analytics-helpers';
import { User } from '../user/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AnalyticsService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getAnalytics(): Promise<AnalyticsData> {
    try {
      const now = new Date();
      now.setHours(23, 59, 59, 999);

      const startOfWeek = getStartOfWeek(now);

      const thirtyDaysAgo = new Date(now);
      thirtyDaysAgo.setDate(now.getDate() - 29);
      thirtyDaysAgo.setHours(0, 0, 0, 0);

      const [totalUsers, usersThisWeek, last30DaysCounts] = await Promise.all([
        this.userRepository.count(),
        this.userRepository
          .createQueryBuilder('user')
          .where('user.createdAt BETWEEN :startOfWeek AND :now', {
            startOfWeek,
            now,
          })
          .getCount(),
        getLast30DaysRegistrationCount(this.userRepository, thirtyDaysAgo, now),
      ]);

      const registrationProgress = totalUsers
        ? Math.round((usersThisWeek / totalUsers) * 100)
        : 0;

      return {
        totalUsers,
        registrationProgress,
        usersThisWeek,
        last30DaysCount: last30DaysCounts,
      };
    } catch (error) {
      console.error('Error fetching analytics data:', error);
      throw new Error('Failed to fetch analytics data');
    }
  }

  // Fetch analytics data for provinces
  async getProvincesAnalytics() {
    try {
      // Current date for filtering schedules
      const currentDate = new Date();

      // Aggregate data per province
      const provincesAnalytics = await this.userRepository
        .createQueryBuilder('user')
        .leftJoin('user.province', 'province')
        .leftJoin(
          'user.schedules',
          'schedule',
          'schedule.date <= :currentDate',
          {
            currentDate,
          },
        )
        .select('province.id', 'provinceId')
        .addSelect('province.name', 'provinceName')
        .addSelect('COUNT(DISTINCT user.id)', 'numberOfUsers')
        .addSelect(
          'COUNT(DISTINCT CASE WHEN schedule.id IS NOT NULL THEN schedule.id END)',
          'totalSchedules',
        )
        .addSelect(
          'COUNT(DISTINCT CASE WHEN schedule.isRead = true THEN schedule.id END)',
          'doneSchedules',
        )
        .where('province.id IS NOT NULL')
        .groupBy('province.id')
        .addGroupBy('province.name')
        .getRawMany();

      // Calculate activity rate for each province
      const analyticsWithActivityRate = provincesAnalytics.map((item) => {
        const totalSchedules = Number(item.totalSchedules) || 0;
        const doneSchedules = Number(item.doneSchedules) || 0;
        const activityRate =
          totalSchedules > 0 ? doneSchedules / totalSchedules : 0;

        return {
          provinceId: Number(item.provinceId),
          provinceName: item.provinceName,
          numberOfUsers: Number(item.numberOfUsers),
          totalSchedules,
          doneSchedules,
          activityRate,
        };
      });

      return analyticsWithActivityRate;
    } catch (error) {
      console.error('Error fetching provinces analytics:', error);
      throw new Error('Failed to fetch provinces analytics data');
    }
  }
}
