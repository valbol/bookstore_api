import express from 'express';
import { authService } from '../services';

const router = express.Router();
router.post('/login', authService.loginUser);

export default router;
