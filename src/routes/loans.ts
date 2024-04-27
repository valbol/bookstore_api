import express, { Request, Response } from 'express';
import { loanService } from '../services';
import { authenticateToken } from '../middleware/jwtMiddleware';
import { UserJwt } from '../types';

const router = express.Router();

router.post('/loan/:bookId', authenticateToken, async (req: Request, res: Response) => {
  try {
    const { userId } = (req as any).user as UserJwt;
    const { bookId } = req.params;
    const { loanPeriod } = req.body;
    if (!loanPeriod) return res.status(400).json({ error: 'Loan period is required' });

    const loan = await loanService.createLoan(userId, bookId, loanPeriod);

    res.status(201).json(loan);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create loan' });
  }
});

router.post('/return/:bookId', authenticateToken, async (req: Request, res: Response) => {
  try {
    const { userId } = (req as any).user as UserJwt;
    const { bookId } = req.params;
    const returnedLoan = await loanService.returnBook(userId, bookId);

    if (!returnedLoan) {
      return res.status(404).json({ error: 'Loan not found' });
    }

    res.json(returnedLoan);
  } catch (error) {
    res.status(500).json({ error: 'Failed to return book' });
  }
});

export default router;
