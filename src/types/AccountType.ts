import { Tier, Transaction } from "./common";

export interface AccountType {
    id: string;
    balance: number;
    tier: Tier;
    nickname: string;
    status: string;
    dateCreated: Date;
    lastUpdated: Date;
    userId: string;
    transactions: Array<Transaction>;
}
