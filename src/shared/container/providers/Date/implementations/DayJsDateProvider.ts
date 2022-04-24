import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import { IDateProvider } from "../IDateProvider";

dayjs.extend(utc);

export class DayJsDateProvider implements IDateProvider {
  compareDates(initialDate: Date, dateToCompare: Date): number {
    const dateToCompareFormatted = dayjs(dateToCompare).utc().local().format();
    const initialDateFormatted = dayjs(initialDate).utc().local().format();

    return dayjs(initialDateFormatted).diff(dateToCompareFormatted, "hours");
  }

  convertToUtc(date: Date): string {
    return dayjs(date).utc().local().format();
  }

  dateNow(): Date {
    return dayjs().toDate();
  }

  compareDays(initialDate: Date, dateToCompare: Date): number {
    const dateToCompareFormatted = dayjs(dateToCompare).utc().local().format();
    const initialDateFormatted = dayjs(initialDate).utc().local().format();

    return dayjs(initialDateFormatted).diff(dateToCompareFormatted, "days");
  }

  addDays(days: number): Date {
    return dayjs().add(days, "days").toDate();
  }

  addHours(hours: number): Date {
    return dayjs().add(hours, "hour").toDate();
  }

  compareIfBefore(initialDate: Date, dateToCompare: Date): boolean {
    const dateToCompareFormatted = dayjs(dateToCompare).utc().local().format();
    const initialDateFormatted = dayjs(initialDate).utc().local().format();

    return dayjs(initialDateFormatted).isBefore(dateToCompareFormatted);
  }
}
