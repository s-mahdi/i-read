export interface AnalyticsData {
  totalUsers: number;
  registrationProgress: number;
  usersThisWeek: number;
  last30DaysCount: { date: string; count: number }[];
}
