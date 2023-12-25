import mongoose from 'mongoose';
import config from '../config';
import { errorLogger, logger } from '../shared/logger';
async function connectDB() {
  try {
    await mongoose.connect(
      `mongodb+srv://${config.mongo_DB_userName}:${config.mongo_DB_password}@cluster0.0brhpy9.mongodb.net/?retryWrites=true&w=majority`,
    );
    logger.info('database connected');
  } catch (error) {
    errorLogger.error('database not connect');
  }
}

// mongodb://127.0.0.1:27017/university-management

export default connectDB;
