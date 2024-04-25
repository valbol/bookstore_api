import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import { Genre } from '../types/book';

const bookSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  author: Joi.string().required(),
  publicationDate: Joi.date().required(),
  genre: Joi.string().valid(Genre.Drama, Genre.Action, Genre.Romance, Genre.Horror).required(),
});

export const validateBookInput = (req: Request, res: Response, next: NextFunction) => {
  const { error } = bookSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.message });
  }
  next();
};

const bookUpdateSchema = Joi.object({
  title: Joi.string().optional(),
  description: Joi.string().optional(),
  author: Joi.string().optional(),
  publicationDate: Joi.date().optional(),
  genre: Joi.string().valid(Genre.Drama, Genre.Action, Genre.Romance, Genre.Horror).optional(),
}).min(1);

export const validateBookUpdateInput = (req: Request, res: Response, next: NextFunction) => {
  const { error } = bookUpdateSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.message });
  }
  next();
};

const userSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
});
export const validateUserCreation = (req: Request, res: Response, next: NextFunction) => {
  const { error } = userSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.message });
  }
  next();
};
