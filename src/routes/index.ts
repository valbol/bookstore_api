import { Application } from 'express';
import healthRouter from './health';
import BooksRouter from './books';

const routes = (app: Application) => {
  app.use('/v1/api/health', healthRouter);
  app.use('/v1/api/books', BooksRouter);
};

export default routes;
