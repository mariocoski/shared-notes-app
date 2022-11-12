import * as jwt from 'jsonwebtoken';
import config from '../../../../config';

interface Options {
  readonly token: string;
}

const verifyJWT = ({ token }: Options) => {
  if (config.jwtSecret === undefined) {
    throw new Error('Undefined JWT secret');
  }

  return jwt.verify(token, config.jwtSecret);
};

export default verifyJWT;
