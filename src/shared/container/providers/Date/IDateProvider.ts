export interface IDateProvider {
  compareDates(initialDate: Date, dateToCompare: Date): number;
  convertToUtc(date: Date): string;
  dateNow(): Date;
  compareDays(initialDate: Date, dateToCompare: Date): number;
  addDays(days: number): Date;
  addHours(hours: number): Date;
  compareIfBefore(initialDate: Date, dateToCompare: Date): boolean;
}
