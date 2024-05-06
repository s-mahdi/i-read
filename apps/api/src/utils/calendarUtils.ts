// src/utils/calendarUtils.ts
import moment from 'moment-jalaali';
import { isHoliday } from 'shamsi-holidays';

export async function getNextNonHolidayDates(
  startDate: Date,
  numDays: number
): Promise<Date[]> {
  const dates: Date[] = [];
  let count = 0;

  while (dates.length < numDays) {
    const potentialDate = new Date(startDate.getTime());
    potentialDate.setDate(potentialDate.getDate() + count);
    const jalaliDate = moment(potentialDate).format('jYYYY/jMM/jDD');

    if (!(await isHoliday(jalaliDate))) {
      dates.push(potentialDate);
    }
    count++;
  }

  return dates;
}
