import mongoose from 'mongoose'
import { errorLogger, logger } from '../shared/logger'
async function connectDB() {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/university-management')
    logger.info('database connected')
  } catch (error) {
    errorLogger.error('database not connect')
  }
}

export default connectDB
