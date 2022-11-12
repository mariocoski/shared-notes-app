import { NextFunction, Request, Response } from 'express';
import verifyJWT from '../../core/utils/jwt/verifyJWT';

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authorizationHeader = req.headers['authorization'];

  if (!authorizationHeader) {
    return next(new Error('Unauthenticated'));
  }

  const [, token] = authorizationHeader.split(' ');

  if (!token) {
    return next(
      new Error(
        'Unauthenticated - wrong format of the authorization header, use "Bearer <TOKEN>"'
      )
    );
  }

  const { data: user } = verifyJWT({ token });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (req as any).user = user;

  console.log('User authenticated', user);

  next();
};
