import { Book } from '../models';
import { IBook } from '../types/book';
import { MongoServerError } from 'mongodb';
import logger from '../logger';
import { Types } from 'mongoose';
import { SearchQuery } from '../types/book';

export const getAllBooks = async () => await Book.find();

export const getBook = async (id: string) => await Book.findOne({ _id: id });

export const addBook = async (newBook: IBook) => {
  try {
    return await Book.create(newBook);
  } catch (error) {
    throw (error as MongoServerError).errmsg;
  }
};

export const updateBook = async (id: string, payload: Partial<IBook>): Promise<IBook | null> => {
  try {
    if (!Types.ObjectId.isValid(id)) {
      logger.error(`Invalid book ID`);
      throw new Error('Invalid book ID');
    }
    const updatedBook = await Book.findByIdAndUpdate({ _id: id }, payload, { new: true });

    return updatedBook;
  } catch (error) {
    logger.error(`MongoDB connection error ${error}`);
    throw error;
  }
};

export const deleteBook = async (id: string) => Book.findOneAndDelete({ _id: id }).select('-_id');

export const search = async (query: SearchQuery) => {
  try {
    const result = await Book.find(query).select('-_id');

    return result;
  } catch (error) {
    logger.error(`MongoDB connection error ${error}`);
    throw error;
  }
};
