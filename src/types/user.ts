import { ILoan } from './loan';

export interface IUser extends Document {
  userName: string;
  email: string;
  loans: ILoan[];
}
