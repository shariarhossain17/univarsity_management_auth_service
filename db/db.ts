import mongoose from 'mongoose';
import subscribeToEvents from '../event';
import { errorLogger, logger } from '../shared/logger';
import { RedisClient } from '../shared/redis';
async function connectDB() {
  try {
    await RedisClient.connect();
    await subscribeToEvents();
    await mongoose.connect(`mongodb://localhost:27017/university-management`);
    logger.info('database connected');
  } catch (error) {
    errorLogger.error('database not connect');
  }
}

// mongodb+srv://${config.mongo_DB_userName}:${config.mongo_DB_password}@cluster0.0brhpy9.mongodb.net/?retryWrites=true&w=majority
export default connectDB;
