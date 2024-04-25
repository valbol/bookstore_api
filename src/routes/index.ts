import { Application } from 'express';
import healthRouter from './health';
import BooksRouter from './books';
import UserRouter from './users';
import LoanRouter from './loans';

const routes = (app: Application) => {
  app.use(`/v1/api/health`, healthRouter);
  app.use(`/v1/api/books`, BooksRouter);
  app.use(`/v1/api/users`, UserRouter);
  app.use(`/v1/api/loans`, LoanRouter);
};

export default routes;
