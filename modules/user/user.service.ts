import config from '../../config/index';
import ApiError from '../../errors/ApiError';
import { generateStudentId } from '../../utils/user.utils';
import { IUser } from './user.interface';
import { User } from './user.model';

export const createUserService = async (
  userData: IUser,
): Promise<IUser | null> => {
  const academi_semister = {
    code: '01',
    year: '2025',
  };
  const id = await generateStudentId(academi_semister);

  userData.id = id;
  if (!userData.password) {
    userData.password = config.user_default_password as string;
  }
  const user = await User.create(userData);
  if (!user) {
    throw new ApiError(400, 'Failed to create user');
  }
  return user;
};
