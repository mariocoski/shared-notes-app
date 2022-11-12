import { validatePayload } from '../../../../shared/core/utils/validation/validatePayload';
import { NextFunction, Request, Response } from 'express';
import { registerSchema, RegisterSchema } from './registerSchema';
import { RegisterUseCase } from './registerUseCase';

export interface Dependencies {
  registerUseCase: RegisterUseCase;
}

export const registerControllerFactory =
  ({ registerUseCase }: Dependencies) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password, name } = req.body;

      const payload = { email, password, name };

      const validatedPayload = await validatePayload<RegisterSchema>(
        payload,
        registerSchema
      );

      const { token, user } = await registerUseCase(validatedPayload);

      return res.status(201).json({ user, token });
    } catch (error) {
      next(error);
    }
  };
