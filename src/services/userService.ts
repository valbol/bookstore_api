import { User } from '../models';
import { IUser } from '../types';
import logger from '../logger';

export const create = async (newUser: IUser) => {
  try {
    const user = new User(newUser);
    await user.save();

    return user;
  } catch (error) {
    logger.error('Failed to create user:', error);
    throw error;
  }
};

export const get = async (email: string) => {
  try {
    await User.findOne({ email: email }).exec();
  } catch (error) {
    logger.error('Failed to retrieve user:', error);
    throw error;
  }
};
