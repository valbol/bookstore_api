import {   Types } from 'mongoose';

export enum UserRole {
  USER = 'User',
  ADMIN = 'Admin',
  MANAGER = 'Manager',
}

export interface IUser extends Document {
  userName: string;
  email: string;
  password: string;
  role: UserRole;
  loans:  Types.ObjectId[];
}

export interface UserJwt {
  userId: string;
  userName: string;
  email: string;
  role: UserRole;
}