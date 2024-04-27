import express, { Request, Response } from 'express';
import { validateUserCreation } from '../middleware/validationMiddleware';
import { userService } from '../services';

// TODO: add caching and auth middlewares
const router = express.Router();

router.post('/create', validateUserCreation, async (req: Request, res: Response) => {
  try {
    const newUser = req.body;
    const resp = await userService.create(newUser);
    if (resp) {
      res.status(201).json({ success: true, message: 'User created successfully', data: resp });
    } else {
      res.status(401).json({ success: false, message: 'something went wrong' });
    }
  } catch (error) {
    res.status(500).send({ success: false, error });
  }
});

router.get('/:email', async (req: Request, res: Response) => {
  try {
    const { email } = req.params;

    const result = await userService.get(email);

    if (!result) {
      res.status(404).send({ success: false, error: 'User not found' });
      return;
    }

    res.send({ success: true, data: result });
  } catch (error) {
    res.status(500).send({ success: false, error: (error as Error).message });
  }
});

export default router;
