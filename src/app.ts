import express, { Application } from 'express';
import cors from 'cors';

const createApp = async () => {
  const app: Application = express();

  const getCorsAllowedOrigins = () => {
    if (process.env.CLIENT_ALLOWED_ORIGINS) {
      const origins = process.env.CLIENT_ALLOWED_ORIGINS.split(',').map((item) => item.trim());
      return [new RegExp(process.env.CLIENT_ALLOWED_ORIGIN_REGEX), ...origins];
    }
    return [new RegExp(process.env.CLIENT_ALLOWED_ORIGIN_REGEX)];
  };

  const corsOptions = {
    origin: getCorsAllowedOrigins(),
    credentials: true,
  };

  app.use(cors(corsOptions));
  app.use(express.json({ limit: '5mb' }));
  app.use(express.urlencoded({ limit: '5mb', extended: true }));

  return app;
};

export default createApp;
