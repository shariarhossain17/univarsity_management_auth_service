import { Schema, model } from 'mongoose';
import { IUser, UserModel } from './user.interface';

import bcrypt from 'bcrypt';
import config from '../../config';

const userSchema = new Schema<IUser, UserModel>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: 0,
    },

    role: {
      type: String,
      required: true,
    },
    student: {
      type: Schema.Types.ObjectId,
      ref: 'Student',
    },
    admin: {
      type: Schema.Types.ObjectId,
      ref: 'Admin',
    },
    faculty: {
      type: Schema.Types.ObjectId,
      ref: 'Faculty',
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);

userSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(this.password, Number(config.saltRounds));
  next();
});

export const User = model<IUser, UserModel>('User', userSchema);
