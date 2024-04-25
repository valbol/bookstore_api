import mongoose from 'mongoose';
import logger from './logger';

const db = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error('MONGO_URI is not defined - cannot connect to MongoDB');
    }

    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 30000,
    });

    logger.info('MongoDB connected successfully');
  } catch (err) {
    logger.error(`MongoDB connection error ${err}`);
  }
};

export default db;
