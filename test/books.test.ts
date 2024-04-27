import mongoose from 'mongoose';
import { expect } from 'chai';
import { bookService } from '../src/services';
import { Genre, IBook } from '../src/types';

before(async () => {
  await mongoose.connect('mongodb://localhost:27017/test');
});

after(async () => {
  await mongoose.connection.close();
});

describe('Book Service', () => {
  beforeEach(async () => {
    await mongoose.connection.collection('books').deleteMany({});
  });

  describe('getAllBooks()', () => {
    it('should fetch all books', async () => {
      const books = await bookService.getAllBooks();
      expect(books).to.be.an('array').that.is.empty;
      const newBook = {
        title: '1984',
        author: 'George Orwell',
        genre: Genre.Drama,
        description: 'A book about a dystopian society',
        publicationYear: 1949,
        isLoaned: false,
      } as IBook;

      await bookService.addBook(newBook);
      const booksAfterAdd = await bookService.getAllBooks();

      expect(booksAfterAdd).to.have.lengthOf(1);
    });
  });

  describe('getBook(id)', () => {
    it('should fetch a book by id', async () => {
      const createdBook = await bookService.addBook({
        title: '1984',
        author: 'George Orwell',
        genre: Genre.Drama,
        description: 'A book about a dystopian society',
        publicationYear: 1949,
        isLoaned: false,
      } as IBook);
      const book = await bookService.getBook(createdBook._id.toString());

      expect(book).to.not.be.null;
      expect(book?.title).to.equal('1984');
    });
  });

  describe('addBook(newBook)', () => {
    it('should add a new book', async () => {
      const newBook = {
        title: '1984',
        author: 'George Orwell',
        genre: Genre.Drama,
        description: 'A book about a dystopian society',
        publicationYear: 1949,
        isLoaned: false,
      } as IBook;
      const book = await bookService.addBook(newBook);

      expect(book).to.include(newBook);
    });
  });

  describe('updateBook(id, payload)', () => {
    it('should update a book details', async () => {
      console.log('updateBook');
      const book = await bookService.addBook({
        title: '1984',
        author: 'George Orwell',
        genre: Genre.Drama,
        description: 'A book about a dystopian society',
        publicationYear: 1949,
        isLoaned: false,
      } as IBook);
      console.log(book);
      const updatedBook = await bookService.updateBook(book._id.toString(), { title: 'New Title' });

      expect(updatedBook).to.not.be.null;
      expect(updatedBook?.title).to.equal('New Title');
    });
  });

  describe('deleteBook(id)', () => {
    it('should delete a specific book', async () => {
      const book = await bookService.addBook({
        title: '1984',
        author: 'George Orwell',
        genre: Genre.Drama,
        description: 'A book about a dystopian society',
        publicationYear: 1949,
        isLoaned: false,
      } as IBook);

      const deletedBook = await bookService.deleteBook(book._id.toString());
      expect(deletedBook).to.not.be.null;
      const lookupBook = await bookService.getBook(book._id.toString());
      expect(lookupBook).to.be.null;
    });
  });

  describe('search(query)', () => {
    it('should return books matching the query', async () => {
      const book = await bookService.addBook({
        title: '1984',
        author: 'George Orwell',
        genre: Genre.Drama,
        description: 'A book about a dystopian society',
        publicationYear: 1949,
        isLoaned: false,
      } as IBook);
      console.log(book);
      const result = await bookService.search({ genre: Genre.Drama });

      expect(result).to.have.lengthOf(1);
      expect(result[0].title).to.equal('1984');
    });
  });
});
