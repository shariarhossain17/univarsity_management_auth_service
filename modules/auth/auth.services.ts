import ApiError from '../../errors/ApiError';
import { User } from '../user/user.model';
import { ILoginUser } from './auth.interface';

const loginUser = async (payload: ILoginUser) => {
  const { id, password } = payload;

  const user = new User();

  const isExist = await user.isUserExist(id);
  if (!isExist) {
    throw new ApiError(400, 'user does not exist');
  }

  if (
    isExist?.password &&
    !user.isPasswordMatched(password, isExist?.password)
  ) {
    throw new ApiError(401, 'incorrect password');
  }

  return {};
};

export default {
  loginUser,
};
