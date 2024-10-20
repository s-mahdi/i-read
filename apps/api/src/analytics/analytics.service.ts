import { Injectable } from '@nestjs/common';
import { AnalyticsData } from '../@types/analytics.interface';
import {
  getLast30DaysRegistrationCount,
  getStartOfWeek,
} from '../helpers/analytics-helpers';
import { User } from '../user/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Province } from '../provinces/entities/province.entity';
import { IGetProvincesAnalyticsProps } from './@types/IGetProvincesAnalyticsProps';

@Injectable()
export class AnalyticsService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Province)
    private provinceRepository: Repository<Province>,
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
  async getProvincesAnalytics(options: IGetProvincesAnalyticsProps) {
    const { page = 1, limit = 50, sort = 'id', order = 'ASC' } = options;

    try {
      const currentDate = new Date();

      // Initialize the main subquery
      const subQuery = this.provinceRepository
        .createQueryBuilder('province')
        .leftJoin('province.users', 'user')
        .leftJoin(
          'user.schedules',
          'schedule',
          'schedule.date <= :currentDate',
          { currentDate },
        )
        .select('province.id', 'province_id')
        .addSelect('province.name', 'province_name')
        .addSelect('COUNT(DISTINCT user.id)', 'number_of_users')
        .addSelect('COUNT(DISTINCT schedule.id)', 'total_schedules')
        .addSelect(
          'COUNT(DISTINCT CASE WHEN schedule.isRead = true THEN schedule.id END)',
          'done_schedules',
        )
        .addSelect(
          `CASE WHEN COUNT(DISTINCT schedule.id) > 0
            THEN ROUND(COUNT(DISTINCT CASE WHEN schedule.isRead = true THEN schedule.id END)::float / COUNT(DISTINCT schedule.id) * 100)
            ELSE 0 END`,
          'activity_rate',
        )
        .groupBy('province.id')
        .addGroupBy('province.name');

      // Sorting logic
      const sortFields: { [key: string]: string } = {
        id: 'province_id',
        provinceName: 'province_name',
        numberOfUsers: 'number_of_users',
        totalSchedules: 'total_schedules',
        doneSchedules: 'done_schedules',
        activityRate: 'activity_rate',
      };

      if (sortFields[sort]) {
        if (sort === 'provinceName') {
          subQuery.orderBy(
            'province_name',
            order.toUpperCase() as 'ASC' | 'DESC',
          );
        } else {
          subQuery.orderBy(
            sortFields[sort],
            order.toUpperCase() as 'ASC' | 'DESC',
          );
        }
      }

      // Get total number of items
      const totalItemsResult = await subQuery.getRawMany();
      const totalItems = totalItemsResult.length;

      // Apply pagination directly on subQuery
      subQuery.skip((page - 1) * limit).take(limit);

      // Get paginated data
      const provincesAnalytics = await subQuery.getRawMany();

      // Get users without a province
      const noProvinceData = await this.userRepository
        .createQueryBuilder('user')
        .leftJoin(
          'user.schedules',
          'schedule',
          'schedule.date <= :currentDate',
          { currentDate },
        )
        .select('COUNT(DISTINCT user.id)', 'number_of_users')
        .addSelect('COUNT(DISTINCT schedule.id)', 'total_schedules')
        .addSelect(
          'COUNT(DISTINCT CASE WHEN schedule.isRead = true THEN schedule.id END)',
          'done_schedules',
        )
        .addSelect(
          `CASE WHEN COUNT(DISTINCT schedule.id) > 0
            THEN ROUND(COUNT(DISTINCT CASE WHEN schedule.isRead = true THEN schedule.id END)::float / COUNT(DISTINCT schedule.id) * 100)
            ELSE 0 END`,
          'activity_rate',
        )
        .where('user.provinceId IS NULL')
        .getRawOne();

      // Combine data
      const analyticsWithActivityRate = provincesAnalytics.map((item) => ({
        id: Number(item.province_id),
        provinceName: item.province_name,
        numberOfUsers: Number(item.number_of_users),
        totalSchedules: Number(item.total_schedules),
        doneSchedules: Number(item.done_schedules),
        activityRate: Number(item.activity_rate),
      }));

      analyticsWithActivityRate.push({
        id: 0,
        provinceName: 'مشخص نشده',
        numberOfUsers: Number(noProvinceData.number_of_users),
        totalSchedules: Number(noProvinceData.total_schedules),
        doneSchedules: Number(noProvinceData.done_schedules),
        activityRate: Number(noProvinceData.activity_rate),
      });

      return {
        data: analyticsWithActivityRate,
        meta: {
          total: totalItems,
          itemCount: analyticsWithActivityRate.length,
          itemsPerPage: limit,
          totalPages: Math.ceil(totalItems / limit),
          currentPage: page,
        },
      };
    } catch (error) {
      console.error('Error fetching provinces analytics:', error);
      throw new Error('Failed to fetch provinces analytics data');
    }
  }
}
