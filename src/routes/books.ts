import express, { Request, Response } from 'express';
import { validateBookInput, validateBookUpdateInput, validateSearchQuery } from '../middleware/validationMiddleware';
import { bookService } from '../services';
import { SearchQuery } from '../types/book';
import { authenticateToken } from '../middleware/jwtMiddleware';
import logger from '../logger';

// TODO: add caching and auth middlewares
const router = express.Router();

router.get('/search', validateSearchQuery, async (req: Request, res: Response) => {
  const { author, topic, year } = req.query;

  let query: SearchQuery = {};
  if (author) {
    query.author = author as string;
  }
  if (topic) {
    query.genre = topic as string;
  }
  if (year) {
    query.publicationYear = Number(year) as number;
  }

  try {
    const books = await bookService.search(query);
    res.json(books);
  } catch (error) {
    logger.error('Search failed:', error);
    res.status(500).json({ success: false, error: (error as Error).message });
  }
});

router.post('/create', authenticateToken, validateBookInput, async (req: Request, res: Response) => {
  try {
    const newBook = req.body;
    const resp = await bookService.addBook(newBook);
    if (resp) {
      res.status(201).json({ success: true, message: 'Book added successfully', data: newBook });
    } else {
      res.status(404).json({ success: false, message: 'something went wrong' });
    }
  } catch (error) {
    logger.error('Create failed:', error);
    res.status(500).json({ success: false, error });
  }
});

router.get('/', async (req: Request, res: Response) => {
  try {
    const result = await bookService.getAllBooks();

    if (!result) {
      res.status(404).json({ success: false, error: 'Book not found' });
      return;
    }

    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, error: (error as Error).message });
  }
});

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ success: false, error: 'Book id is required' });

    const result = await bookService.getBook(id);

    if (!result) {
      res.status(404).json({ success: false, error: 'Book not found' });
      return;
    }

    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, error: (error as Error).message });
  }
});

router.put('/:id', authenticateToken, validateBookUpdateInput, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, description, author, publicationYear, genre } = req.body;
    const bookDetails = { title, description, author, publicationYear, genre };
    const result = await bookService.updateBook(id, bookDetails);

    if (!result) {
      logger.error('Book not found');
      res.status(404).json({ success: false, error: 'Book not found' });
      return;
    }

    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, error: (error as Error).message });
  }
});

router.delete('/:id', authenticateToken, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const result = await bookService.deleteBook(id);
    if (!result) {
      res.status(404).json({ success: false, error: 'Book not found' });
      return;
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ success: false, error: (error as Error).message });
  }
});

export default router;
