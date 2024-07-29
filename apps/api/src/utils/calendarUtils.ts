export async function getDates(
  startDate: Date,
  numDays: number,
): Promise<Date[]> {
  const dates: Date[] = [];
  let count = 0;

  while (dates.length < numDays) {
    const potentialDate = new Date(startDate.getTime());
    potentialDate.setDate(potentialDate.getDate() + count);

    dates.push(potentialDate);
    count++;
  }

  return dates;
}
