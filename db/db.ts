import mongoose from 'mongoose';
import config from '../config';
import subscribeToEvents from '../event';
import { errorLogger, logger } from '../shared/logger';
import { RedisClient } from '../shared/redis';
async function connectDB() {
  try {
    await RedisClient.connect();
    await subscribeToEvents();
    await mongoose.connect(
      `mongodb+srv://${config.mongo_DB_userName}:${config.mongo_DB_password}@cluster0.0brhpy9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`,
    );

    logger.info('database connected');
  } catch (error) {
    errorLogger.error('database not connect');
  }
}

// mongodb+srv://${config.mongo_DB_userName}:${config.mongo_DB_password}@cluster0.0brhpy9.mongodb.net/?retryWrites=true&w=majority
export default connectDB;
