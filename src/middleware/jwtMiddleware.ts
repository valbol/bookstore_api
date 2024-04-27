import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import logger from '../logger';

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    (req as any).user = decoded;
    logger.info(`${req.url} user: ${JSON.stringify(decoded)}`);
    next();
  } catch (error) {
    res.status(403).json({ message: 'Invalid token.' });
  }
};
