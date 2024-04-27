const Joi = require('joi').extend(require('@joi/date'));
import { Request, Response, NextFunction } from 'express';
import { Genre, UserRole } from '../types';

const bookSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  author: Joi.string().required(),
  publicationYear: Joi.date().format('YYYY').required(),
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
  publicationYear: Joi.date().format('YYYY').optional(),
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
  userName: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  password: Joi.string().required(),
  role: Joi.string().valid(UserRole.ADMIN, UserRole.MANAGER, UserRole.USER).required(),
  loans: Joi.array()
    .items(Joi.string().pattern(/^[0-9a-fA-F]{24}$/))
    .optional(),
});

export const validateUserCreation = (req: Request, res: Response, next: NextFunction) => {
  const { error } = userSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.message });
  }
  next();
};


const searchQuerySchema = Joi.object({
  author: Joi.string().trim().optional(),
  topic:  Joi.string().valid(Genre.Drama, Genre.Action, Genre.Romance, Genre.Horror).optional(),
  year: Joi.number().integer().min(1900).max(new Date().getFullYear()).optional()
}).or('author', 'topic', 'year');

export const validateSearchQuery = (req: Request, res: Response, next: NextFunction) => {
  const { error } = searchQuerySchema.validate(req.query);
  if (error) {
    return res.status(400).json({ error: error.message });
  }
  next();
};
