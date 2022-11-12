import * as jwt from 'jsonwebtoken';
import { v4 } from 'uuid';
import config from '../../../../config';

export interface Options {
  readonly data: Record<string, unknown>;
}

const generateJWT = ({ data }: Options): string => {
  if (config.jwtSecret === undefined) {
    throw new Error('Undefined JWT secret');
  }

  const token = jwt.sign({ data, jti: v4() }, config.jwtSecret, {
    algorithm: config.jwtAlgo,
    expiresIn: config.jwtExpiresIn,
  });

  return token;
};
export default generateJWT;
