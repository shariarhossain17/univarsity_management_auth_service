import colors from 'colors';
import { Server } from 'http';
import app from './app/app';
import config from './config/index';
import connectDB from './db/db';
import { errorLogger, logger } from './shared/logger';

process.on('uncaughtException', error => {
  errorLogger.error('uncaughtException detected....', error);
  process.exit(1);
});
let server: Server;
connectDB();

// eslint-disable-next-line prefer-const
server = app.listen(config.port, () => {
  logger.info(
    colors.yellow(`university-management server running on ${config.port}`),
  );
});

process.on('unhandledRejection', error => {
  if (server) {
    server.close(() => {
      errorLogger.error('unhandledRejection', error);
    });
  } else {
    process.exit(1);
  }
});

process.on('SIGTERM', () => {
  logger.info('SIGTERM is recived');
  if (server) server.close();
});
