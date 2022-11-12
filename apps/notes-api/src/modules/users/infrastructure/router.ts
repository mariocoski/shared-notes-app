import * as express from 'express';
import { loginController } from '../useCases/login/index';
import { registerController } from '../useCases/register/index';

export const createAuthRouter = () => {
  const router = express.Router();

  router.post('/login', loginController);
  router.post('/register', registerController);

  return router;
};
