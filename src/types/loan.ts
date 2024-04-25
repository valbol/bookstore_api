import { Schema } from 'mongoose';

export interface ILoan extends Document {
  book: Schema.Types.ObjectId;
  loanDate: Date;
  loanPeriod: number;
  returnDate: Date;
  returned: boolean;
}
