import mongoose, { Schema } from 'mongoose';
import { IUser } from '../types';
import { UserRole } from '../types/user';
import bcrypt from 'bcrypt';

const userSchema = new Schema<IUser>({
  userName: { type: String, required: true, index: true },
  email: { type: String, required: true, unique: true, index: true },
  password: { type: String, required: true },
  role: { type: String, enum: UserRole, required: true, index: true },
  loans: [{ type: Schema.Types.ObjectId, ref: 'Loan' }],
});

userSchema.index({ userName: 1, email: 1 });

userSchema.pre('save', function (next) {
  if (!this.isModified('password')) return next();
  bcrypt.hash(this.password, 5, (err, hash) => {
    if (err) return next(err);
    this.password = hash;
    next();
  });
});

export default mongoose.model<IUser>('User', userSchema);
