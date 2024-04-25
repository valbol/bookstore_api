import createApp from './app';
import dotenv from 'dotenv';
import logger from './logger';

const initializeServer = async () => {
  dotenv.config();
  console.log(process.env);
  const app = await createApp();
  const port = Number(process.env.SERVER_PORT) || 3000;

  app.listen(port, () => {
    logger.info(`App is running on port ${port} in ${app.get('env')} mode`);
    logger.info('Press CTRL-C to stop');
  });
};

initializeServer()
  .then(() => {
    logger.info('server initialized successfully');
  })
  .catch((error) => {
    logger.error(`server initialization error: ${error}`);
  });
