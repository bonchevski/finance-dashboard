// /C:/code/finance-dashboard/src/types/ReportType.ts

import { Transaction } from "./common";

export enum TimeInterval {
  HOURLY = 'hourly',
  DAILY = 'daily',
  WEEKLY = 'weekly',
  MONTHLY = 'monthly',
}

export type Report = {
  id: number;
  name: string;
  interval: TimeInterval;
  transactions?: Array<Transaction>;
  dateCreated: Date;
  startBalance: number;
  endBalance: number;
  balanceChange: number;
};
