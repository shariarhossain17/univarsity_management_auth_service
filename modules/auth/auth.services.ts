import config from '../../config';
import ApiError from '../../errors/ApiError';
import { jwtHelper } from '../../helper/jwtHelper';
import { User } from '../user/user.model';
import { ILoginResponse, ILoginUser } from './auth.interface';

import { Secret } from 'jsonwebtoken';

const loginUser = async (payload: ILoginUser): Promise<ILoginResponse> => {
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

  // token

  const { id: userId, role, needPasswordChange } = isExist;

  console.log(config.jwt.jwt_refresh_secret as string);

  const accessToken = jwtHelper.createToken(
    {
      userId,
      role,
    },
    config.jwt.jwt_secret as Secret,
    config.jwt.jwt_expires_in as string,
  );
  const refreshToken = jwtHelper.createToken(
    {
      userId,
      role,
    },
    config.jwt.jwt_refresh_secret as Secret,
    config.jwt.jwt_refresh_expires_in as string,
  );

  const needChangePassword = needPasswordChange ? needPasswordChange : true;

  return {
    accessToken,
    refreshToken,
    needChangePassword,
  };
};

export default {
  loginUser,
};
