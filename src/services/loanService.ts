import logger from '../logger';
import { Loan } from '../models';

const DAYS_IN_MILISEC = 24 * 60 * 60 * 1000;

export const createLoan = async (bookId: string, loanPeriod: number) => {
  const loanDate = new Date();
  const returnDate = new Date(loanDate.getTime() + loanPeriod * DAYS_IN_MILISEC);

  try {
    const newLoan = new Loan({
      book: bookId,
      loanDate,
      loanPeriod,
      returnDate,
      returned: false,
    });
    await newLoan.save();

    return newLoan;
  } catch (error) {
    logger.error('Failed to create loan:', error);
    throw error;
  }
};

export const returnBook = async (loanId: string) => {
  try {
    const updatedLoan = await Loan.findByIdAndUpdate(
      loanId,
      {
        returned: true,
        returnDate: new Date(),
      },
      { new: true },
    );

    return updatedLoan;
  } catch (error) {
    logger.error('Failed to return loan:', error);
    throw error;
  }
};
