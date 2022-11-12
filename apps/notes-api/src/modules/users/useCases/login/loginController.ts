import { validatePayload } from '../../../../shared/core/utils/validation/validatePayload';
import { NextFunction, Request, Response } from 'express';
import { loginSchema, LoginSchema } from './loginSchema';
import { LoginUseCase } from './loginUseCase';

export interface Dependencies {
  loginUseCase: LoginUseCase;
}

export const loginControllerFactory =
  ({ loginUseCase }: Dependencies) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;

      const payload = { email, password };

      const validatedPayload = await validatePayload<LoginSchema>(
        payload,
        loginSchema
      );

      const { token, user } = await loginUseCase(validatedPayload);

      return res.status(200).json({ user, token });
    } catch (error) {
      next(error);
    }
  };
