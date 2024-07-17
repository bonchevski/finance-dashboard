import { AccountType } from "./AccountType";
import { Tier } from "./common";


export interface UserType {
  id: string;
  firstName: string;
  lastName: string;
  accounts: Array<AccountType>;
  totalBalance: number;
  country: string;
  address: string;
  postalCode: number;
  tier: Tier;
  dateCreated: Date;
  lastUpdated: Date;
}
