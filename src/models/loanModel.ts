import mongoose, { Schema } from 'mongoose';
import { ILoan } from '../types';

const loanSchema = new Schema<ILoan>({
  book: { type: Schema.Types.ObjectId, ref: 'Book', required: true },
  loanDate: { type: Date, required: true, index: true },
  loanPeriod: { type: Number, required: true },
  returnDate: { type: Date, index: true },
  returned: { type: Boolean, required: true, default: false },
});

loanSchema.index({ book: 1, returned: 1, returnDate: 1 });

export default mongoose.model<ILoan>('Loan', loanSchema);
