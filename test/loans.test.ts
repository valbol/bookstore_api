import mongoose from 'mongoose';
import { expect } from 'chai';
import { loanService, userService, bookService } from '../src/services';
import { IUser, UserRole, Genre, IBook } from '../src/types';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { User, Loan, Book } from '../src/models';

chai.use(chaiAsPromised);

before(async () => {
  await mongoose.connect('mongodb://localhost:27017/test', { replicaSet: 'rs0' });
});

after(async () => {
  await mongoose.connection.close();
});

beforeEach(async () => {
  await User.deleteMany({});
  await Loan.deleteMany({});
  await Book.deleteMany({});
});

describe('Loan Service', () => {
  describe('createLoan', () => {
    it('should successfully create a loan', async () => {
      const user = await userService.create({
        userName: 'John Doe',
        email: 'john.doe@test.com',
        password: '123456',
        role: UserRole.USER,
        loans: [],
      } as IUser);

      const book = await bookService.addBook({
        title: '1984',
        author: 'George Orwell',
        genre: Genre.Drama,
        description: 'A book about a dystopian society',
        publicationYear: 1949,
        isLoaned: false,
      } as IBook);

      const savedLoan = await loanService.createLoan(user._id.toString(), book._id.toString(), 15);

      expect(savedLoan).to.exist;
      expect(savedLoan.returned).to.be.false;
    });

    it('should fail to create a loan if the book is already loaned', async () => {
      const user = await userService.create({
        userName: 'John Doe',
        email: 'john.doe@test.com',
        password: '123456',
        role: UserRole.USER,
        loans: [],
      } as IUser);

      const book = await bookService.addBook({
        title: '1984',
        author: 'George Orwell',
        genre: Genre.Drama,
        description: 'A book about a dystopian society',
        publicationYear: 1949,
        isLoaned: true,
      } as IBook);

      await expect(loanService.createLoan(user._id.toString(), book._id.toString(), 15)).to.eventually.be.rejectedWith(
        Error,
      );
    });
  });

  describe('returnBook', () => {
    it('should return a book successfully', async () => {
      const user = await userService.create({
        userName: 'John Doe',
        email: 'john.doe@test.com',
        password: '123456',
        role: UserRole.USER,
        loans: [],
      } as IUser);

      const book = await bookService.addBook({
        title: '1984',
        author: 'George Orwell',
        genre: Genre.Drama,
        description: 'A book about a dystopian society',
        publicationYear: 1949,
        isLoaned: false,
      } as IBook);

      await loanService.createLoan(user._id.toString(), book._id.toString(), 15);

      const result = await loanService.returnBook(user._id.toString(), book._id.toString());
      expect(result.message).to.equal('Book returned successfully.');
    });
  });
});
