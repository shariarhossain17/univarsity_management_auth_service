import config from '../../config';
import ApiError from '../../errors/ApiError';
import { jwtHelper } from '../../helper/jwtHelper';
import { User } from '../user/user.model';
import {
  IChangePassword,
  ILoginResponse,
  ILoginUser,
  IRefreshToken,
} from './auth.interface';

import { JwtPayload, Secret } from 'jsonwebtoken';

import bcrypt from 'bcrypt';

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

const refreshToken = async (token: string): Promise<IRefreshToken> => {
  let verifiedToken: JwtPayload;
  try {
    verifiedToken = jwtHelper.verifyToken(
      token,
      config.jwt.jwt_refresh_secret as Secret,
    );
  } catch (err) {
    throw new ApiError(403, 'invalid refresh token');
  }

  // checking delete user refresh tokem

  const { userId } = verifiedToken;

  const user = new User();

  const isUserExist = await user.isUserExist(userId);

  if (!isUserExist) {
    throw new ApiError(404, 'user does not exist');
  }

  // create refresh token
  const newAccessToken = jwtHelper.createToken(
    {
      userId: isUserExist.id,
      role: isUserExist.role,
    },
    config.jwt.jwt_refresh_secret as Secret,
    config.jwt.jwt_refresh_expires_in as string,
  );

  return {
    accessToken: newAccessToken,
  };
};

const changePassword = async (
  user: JwtPayload,
  payload: IChangePassword,
): Promise<void> => {
  const { newPassword, oldPassword } = payload;
  const databaseUser = new User();

  const isExist = await databaseUser.isUserExist(user.userId);
  if (!isExist) {
    throw new ApiError(400, 'user does not exist');
  }

  // checking old password

  if (
    isExist?.password &&
    !user.isPasswordMatched(oldPassword, isExist?.password)
  ) {
    throw new ApiError(401, 'oldPassword is incorrect');
  }

  const newHashpassword = await bcrypt.hash(
    newPassword,
    Number(config.saltRounds),
  );

  // update password

  const updatedData = {
    password: newHashpassword,
    needPasswordChange: false,
    passwordChangedAt: new Date(),
  };

  await User.findOneAndUpdate({ id: user.userId }, updatedData);
};

export default {
  loginUser,
  refreshToken,
  changePassword,
};
