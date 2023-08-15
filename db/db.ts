import colors from 'colors'
import mongoose from 'mongoose'
async function connectDB() {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/university-management')
    console.log(colors.red('database connected').bold)
  } catch (error) {
    console.log('database not connect')
  }
}

export default connectDB
