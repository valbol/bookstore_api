import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import { Genre } from '../types/book';

const bookSchema = Joi.object({
  title: Joi.string().required(),
  idNumber: Joi.number().required(),
  description: Joi.string().required(),
  author: Joi.string().required(),
  publicationDate: Joi.date().required(),
  genre: Joi.string().valid(Genre.Drama, Genre.Action, Genre.Romance, Genre.Horror).required(),
  price: Joi.number().positive().required(),
});

export const validateBookInput = (req: Request, res: Response, next: NextFunction) => {
  const { error } = bookSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.message });
  }
  next();
};
