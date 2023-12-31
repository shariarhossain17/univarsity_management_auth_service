import { NextFunction, Request } from 'express';
import { Secret } from 'jsonwebtoken';
import config from '../config';
import ApiError from '../errors/ApiError';
import { jwtHelper } from '../helper/jwtHelper';

const auth = () => async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      throw new ApiError(401, 'unauthorized access');
    }

    let verifiedUser = null;

    verifiedUser = jwtHelper.verifyToken(
      token,
      config.jwt.jwt_secret as Secret,
    );

    req.user = verifiedUser; // role  , userid

    next();
  } catch (error) {
    next(error);
  }
};

export default auth;
