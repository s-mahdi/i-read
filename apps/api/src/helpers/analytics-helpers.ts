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

export const ranks = [
  'کارمند',
  'روحانی',
  'سرباز',
  'گروهبان دوم',
  'گروهبان یکم',
  'استوار دوم',
  'استوار یکم',
  'ستوان سوم',
  'ستوان دوم',
  'ستوان یکم',
  'سروان',
  'سرگرد',
  'سرهنگ دوم',
  'سرهنگ',
  'سرتیپ دوم',
  'سرتیپ',
  'سرلشکر',
  'سپهبد',
  'ارتشبد',
];

// Create a mapping for rank order
const rankOrderMapping: Record<string, number> = ranks.reduce(
  (acc, rank, index) => {
    acc[rank] = index + 1;
    return acc;
  },
  {} as Record<string, number>,
);

/**
 * Applies sorting to the query builder.
 * @param queryBuilder TypeORM QueryBuilder instance
 * @param sortField Field to sort by
 * @param sortOrder Order direction ('ASC' or 'DESC')
 */
export const applySorting = (
  queryBuilder: any,
  sortField: string,
  sortOrder: 'ASC' | 'DESC',
) => {
  // Define sortable fields
  const sortFields: Record<string, string> = {
    id: 'user.id',
    username: 'user.username',
    email: 'user.email',
    name: 'user.name',
    lastName: 'user.lastName',
    rank: 'user.rank',
    // Add more sortable fields as needed
  };

  if (sortField === 'rank') {
    // Build CASE statement for rank sorting
    const caseStatement = Object.entries(rankOrderMapping)
      .map(
        ([rank, orderValue]) => `WHEN user.rank = '${rank}' THEN ${orderValue}`,
      )
      .join(' ');

    const rankOrderSql = `CASE ${caseStatement} ELSE ${ranks.length + 1} END`;

    // Add the CASE statement as a computed column
    queryBuilder.addSelect(`${rankOrderSql}`, 'rank_order');

    // Order by the computed column
    queryBuilder.orderBy('rank_order', sortOrder);
  } else if (sortFields[sortField]) {
    queryBuilder.orderBy(sortFields[sortField], sortOrder);
  } else {
    throw new Error(`Invalid sort field: ${sortField}`);
  }
};
