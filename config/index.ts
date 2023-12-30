import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  student_default_password: process.env.STUDENT_DEFAULT_PASSWORD,
  admin_default_password: process.env.ADMIN_DEFAULT_PASSWORD,
  mongo_DB_userName: process.env.MONGO_DB_USERNAME,
  mongo_DB_password: process.env.MONGO_DB_PASS,
};
