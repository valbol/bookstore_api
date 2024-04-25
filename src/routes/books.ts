import express, { Request, Response } from 'express';

const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
  res.send('ok');
});

router.get('/', async (req: Request, res: Response) => {
  res.send('ok');
});

router.get('/:id', async (req: Request, res: Response) => {
  res.send('ok');
});

router.put('/:id', async (req: Request, res: Response) => {
  res.send('ok');
});

router.delete('/:id', async (req: Request, res: Response) => {
  res.send('ok');
});

router.get('/search/:option', async (req: Request, res: Response) => {
  res.send('ok');
});

router.get('/loan/:id', async (req: Request, res: Response) => {
  res.send('ok');
});

router.get('/return/:id', async (req: Request, res: Response) => {
  res.send('ok');
});

export default router;
