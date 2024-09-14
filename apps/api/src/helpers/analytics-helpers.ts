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

export function getLast30DaysRegistrationCount(users: any[]) {
  const today = new Date();
  const dateCounts: Record<string, number> = {};

  users.forEach((user) => {
    const userDate = new Date(user.createdAt).toISOString().split('T')[0];
    dateCounts[userDate] = (dateCounts[userDate] || 0) + 1;
  });

  const last30Days = Array.from({ length: 30 }, (_, i) => {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    const formattedDate = date.toISOString().split('T')[0];
    return { date: formattedDate, count: dateCounts[formattedDate] || 0 };
  }).reverse();

  return last30Days;
}
