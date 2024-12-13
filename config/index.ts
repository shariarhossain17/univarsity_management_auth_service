import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  student_default_password: process.env.STUDENT_DEFAULT_PASSWORD,
  admin_default_password: process.env.ADMIN_DEFAULT_PASSWORD,
  faculty_default_password: process.env.FACULTY_DEFAULT_PASSWORD,
  saltRounds: process.env.BCRYPT_SALT,
  mongo_DB_userName: process.env.MONGO_DB_USERNAME,
  mongo_DB_password: process.env.MONGO_DB_PASS,
  jwt: {
    jwt_secret: process.env.JWT_SECRET,
    jwt_expires_in: process.env.JWT_EXPIRES_IN,
    jwt_refresh_secret: process.env.JWT_REFRESH_SECRET,
    jwt_refresh_expires_in: process.env.JWT_REFRESH_EXPIRES_IN,
  },

  redis: {
    url: process.env.REDIS_URL,
    expires_in: process.env.REDIS_TOKEN_EXPIRES_IN,
  },
};
