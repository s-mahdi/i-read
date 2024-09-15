export interface IProvincesAnalytics {
  last30DaysCount: { date: string; count: number }[];
  usersThisWeek: number;
  registrationProgress: number;
  totalUsers: number;
}
