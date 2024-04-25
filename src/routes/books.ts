import express, { Request, Response } from 'express';
import { validateBookInput, validateBookUpdateInput } from '../middleware/validationMiddleware';
import { bookService } from '../services';
import { SearchQuery } from '../types/book';

// TODO: add caching and auth middlewares
const router = express.Router();

router.post('/create', validateBookInput, async (req: Request, res: Response) => {
  try {
    const newBook = req.body;
    const resp = await bookService.addBook(newBook);
    if (resp) {
      res.status(201).json({ success: true, message: 'Book added successfully', data: newBook });
    } else {
      res.status(404).json({ success: false, message: 'something went wrong' });
    }
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
});

router.get('/', async (req: Request, res: Response) => {
  console.log('here');
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

    const result = await bookService.getBook(Number(id));

    if (!result) {
      res.status(404).json({ success: false, error: 'Book not found' });
      return;
    }

    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, error: (error as Error).message });
  }
});

router.put('/:id', validateBookUpdateInput, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { payload } = req.body;
    const result = await bookService.updateBook(id, payload);

    if (!result) {
      res.status(404).json({ success: false, error: new Error('Book not found') });
      return;
    }

    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, error: (error as Error).message });
  }
});

router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await bookService.deleteBook(id);
    if (!result) {
      res.status(401).json({ success: false, error: new Error('Book not found') });
      return;
    }

    res.status(204);
  } catch (error) {
    res.status(500).json({ success: false, error: (error as Error).message });
  }
});

router.get('/search', async (req: Request, res: Response) => {
  const { author, topic, year } = req.query;

  let query: SearchQuery;
  if (author) {
    query.author = author as string;
  }
  if (topic) {
    query.genre = topic as string;
  }
  if (year) {
    query.year = Number(year) as number;
  }

  try {
    const books = await bookService.search(query);
    res.json(books);
  } catch (error) {
    console.error('Search failed:', error);
    res.status(500).json({ success: false, error: (error as Error).message });
  }
});

export default router;
