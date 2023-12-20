import ApiError from '../../errors/ApiError';
import { IUser } from './user.interface';
import { User } from './user.model';

export const createUserService = async (
  userData: IUser,
): Promise<IUser | null> => {
  // const id = await generateStudentId();

  // userData.id = id;
  // if (!userData.password) {
  //   userData.password = config.user_default_password as string;
  // }
  const user = await User.create(userData);
  if (!user) {
    throw new ApiError(400, 'Failed to create user');
  }
  return user;
};
