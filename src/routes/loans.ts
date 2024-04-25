import express, { Request, Response } from 'express';
import { loanService } from '../services';

const router = express.Router();

router.post('/loan/:bookId', async (req: Request, res: Response) => {
  try {
    const { bookId } = req.params;
    const { loanPeriod } = req.body; 
    
    const loan = await loanService.createLoan(bookId, loanPeriod);

    res.status(201).json(loan);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create loan' });
  }
});


router.post('/return/:loanId', async (req: Request, res: Response) => {
  try {
    const { loanId } = req.params;
    const returnedLoan = await loanService.returnBook(loanId);

    if (!returnedLoan) {
      return res.status(404).json({ error: 'Loan not found' });
    }

    res.json(returnedLoan);
  } catch (error) {
    res.status(500).json({ error: 'Failed to return book' });
  }
});

export default router;