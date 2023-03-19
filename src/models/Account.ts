import { Customer } from "./Customer";

export interface Account {
  id?: Number;
  agency?: String;
  account?: String;
  balance?: Number;
  password?: String;
  customer?: Customer;
}
