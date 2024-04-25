import mongoose, { Schema } from 'mongoose';
import { IUser } from '../types';

const userSchema = new Schema<IUser>({
  userName: { type: String, required: true, index: true },
  email: { type: String, required: true, unique: true, index: true },
  loans: [{ type: Schema.Types.ObjectId, ref: 'Loan' }],
});

userSchema.index({ userName: 1, email: 1 });

export default mongoose.model<IUser>('User', userSchema);
