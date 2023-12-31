/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express';
import { Secret } from 'jsonwebtoken';
import config from '../config';
import ApiError from '../errors/ApiError';
import { jwtHelper } from '../helper/jwtHelper';

const auth =
  (...requiredRoles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
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

      req.user = verifiedUser;

      //   roled checked

      if (requiredRoles.length && !requiredRoles.includes(verifiedUser.role)) {
        throw new ApiError(403, 'forbidden access');
      }
      next();
    } catch (error) {
      next(error);
    }
  };

export default auth;
