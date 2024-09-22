import { User } from '../user/entities/user.entity';
import { Repository } from 'typeorm';

export function getWeekNumber(date: Date): number {
  const targetDate = new Date(date);
  targetDate.setHours(0, 0, 0, 0);
  const dayNumber = targetDate.getUTCDay() || 7; // Convert Sunday (0) to 7
  targetDate.setUTCDate(targetDate.getUTCDate() + 4 - dayNumber);
  const yearStart = new Date(Date.UTC(targetDate.getUTCFullYear(), 0, 1));
  return Math.ceil(
    ((targetDate.getTime() - yearStart.getTime()) / 86400000 + 1) / 7,
  );
}

export async function getLast30DaysRegistrationCount(
  userRepository: Repository<User>,
  startDate: Date,
  endDate: Date,
): Promise<{ date: string; count: number }[]> {
  // Query to get the count of users grouped by date using PostgreSQL's DATE_TRUNC function
  const rawData = await userRepository
    .createQueryBuilder('user')
    .select("TO_CHAR(DATE_TRUNC('day', user.createdAt), 'YYYY-MM-DD')", 'date')
    .addSelect('COUNT(*)', 'count')
    .where('user.createdAt BETWEEN :startDate AND :endDate', {
      startDate,
      endDate,
    })
    .groupBy('date')
    .orderBy('date', 'ASC')
    .getRawMany();

  // Create a map from the raw data
  const countsMap: Record<string, number> = {};
  rawData.forEach((entry) => {
    const date = entry.date; // Date is already formatted as 'YYYY-MM-DD'
    countsMap[date] = Number(entry.count);
  });

  // Generate the last 30 days array with counts
  const last30Days = [];
  for (let i = 29; i >= 0; i--) {
    const date = new Date(endDate);
    date.setDate(endDate.getDate() - i);
    const formattedDate = date.toISOString().split('T')[0];
    last30Days.push({
      date: formattedDate,
      count: countsMap[formattedDate] || 0,
    });
  }

  return last30Days;
}

export function getStartOfWeek(date: Date): Date {
  const dayOfWeek = date.getDay(); // 0 (Sunday) to 6 (Saturday)
  const startOfWeek = new Date(date);
  startOfWeek.setDate(date.getDate() - dayOfWeek);
  startOfWeek.setHours(0, 0, 0, 0);
  return startOfWeek;
}
