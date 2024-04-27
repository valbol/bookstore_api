import mongoose from 'mongoose';
import logger from '../logger';
import { Loan, Book, User } from '../models';

const DAYS_IN_MILISEC = 24 * 60 * 60 * 1000;

export const createLoan = async (userId: string, bookId: string, loanPeriod: number) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const book = await Book.findById(bookId).session(session);
    if (!book) {
      throw new Error('Book not found');
    }
    if (book.isLoaned) {
      throw new Error('Book is currently loaned out');
    }

    book.isLoaned = true;
    await book.save({ session });

    const loanDate = new Date();
    const returnDate = new Date(loanDate.getTime() + loanPeriod * DAYS_IN_MILISEC);

    const newLoan = new Loan({
      book: bookId,
      loanDate,
      loanPeriod,
      returnDate,
      returned: false,
    });

    const savedLoan = await newLoan.save({ session });

    const user = await User.findById(userId).session(session);
    user.loans.push(savedLoan._id);
    await user.save({ session });

    await session.commitTransaction();
    session.endSession();

    return savedLoan;
  } catch (error) {
    await session.abortTransaction();
    session.endSession();

    logger.error('Failed to create loan:', error);
    throw error;
  }
};

export const returnBook = async (userId: string, bookId: string) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const loan = await Loan.findOne({ book: bookId, returned: false }).session(session);

    if (!loan) {
      throw new Error('No active loan found for this book');
    }

    const user = await User.findById(userId).session(session);
    if (!user) {
      throw new Error('User not found');
    }
    if (!user.loans.includes(loan._id)) {
      throw new Error('This loan does not belong to the user');
    }

    const book = await Book.findById(bookId).session(session);
    if (!book) {
      throw new Error('Book not found');
    }

    book.isLoaned = false;
    await book.save({ session });
    loan.returned = true;
    loan.returnDate = new Date();
    await loan.save({ session });

    await User.findByIdAndUpdate(
      userId,
      {
        $pull: { loans: loan._id },
      },
      { session },
    );

    await session.commitTransaction();
    session.endSession();
    return { message: 'Book returned successfully.' };
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    logger.error('Failed to return book:', error);
    throw error;
  }
};
