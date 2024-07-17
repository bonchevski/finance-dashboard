export enum Tier {
  BASIC = 'basic',
  PREMIUM = 'premium',
  ELITE = 'elite',
}

export enum Priority {
  LOW = 0,
  MID = 1,
  HIGH = 2,
}

export enum GoalStatus {
  IN_PROGRESS = 0,
  COMPLETED = 1,
  FAILED = 2,
}

export type Transaction = {
  id: string;
  amount: number;
  date: Date;
  description: string;
  category: string;
  accountId: string;
  userId: string;
  dateCreated: Date;
  lastUpdated: Date;
  // TODO: revise the category type to be an enum maybe
};
