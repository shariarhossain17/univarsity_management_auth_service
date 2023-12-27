import mongoose from 'mongoose';
import { errorLogger, logger } from '../shared/logger';
async function connectDB() {
  try {
    await mongoose.connect(`mongodb://127.0.0.1:27017/university-management`);
    logger.info('database connected');
  } catch (error) {
    errorLogger.error('database not connect');
  }
}

// mongodb+srv://${config.mongo_DB_userName}:${config.mongo_DB_password}@cluster0.0brhpy9.mongodb.net/?retryWrites=true&w=majority
export default connectDB;
