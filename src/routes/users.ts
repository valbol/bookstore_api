import express, { Request, Response } from 'express';
import { validateUserCreation } from '../middleware/validationMiddleware';
import { bookService } from '../services';

// TODO: add caching and auth middlewares
const router = express.Router();

router.post('/create', validateUserCreation, async (req: Request, res: Response) => {
  try {
    const newBook = req.body;
    const resp = await bookService.addBook(newBook);
    if (resp) {
      res.status(201).json({ success: true, message: 'Book added successfully', data: newBook });
    } else {
      res.status(401).json({ success: false, message: 'something went wrong' });
    }
  } catch (error) {
    res.status(500).send({ success: false, error });
  }
});

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const result = await bookService.getBook(Number(id));

    if (!result) {
      res.status(404).send({ success: false, error: 'Book not found' });
      return;
    }

    res.send({ success: true, data: result });
  } catch (error) {
    res.status(500).send({ success: false, error: (error as Error).message });
  }
});

export default router;
