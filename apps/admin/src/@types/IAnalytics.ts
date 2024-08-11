export interface IAnalytics {
  last30DaysCount: { date: string; count: number }[];
  usersThisWeek: number;
  registrationProgress: number;
  totalUsers: number;
}
