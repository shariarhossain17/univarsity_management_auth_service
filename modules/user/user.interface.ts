import { Model, Types } from 'mongoose';
import { IAdmin } from '../admin/admin.interface';
import { IStudent } from '../student/student.interface';

export type IUser = {
  id: string;
  password: string;
  role: string;
  needPasswordChange: true | false;
  student?: Types.ObjectId | IStudent;
  faculty: Types.ObjectId;
  admin: Types.ObjectId | IAdmin;
};

export type UserModel = Model<IUser, Record<string, unknown>>;
