import { validatePayload } from '../../../../shared/core/utils/validation/validatePayload';
import { NextFunction, Request, Response } from 'express';
import { createNoteSchema, CreateNoteSchema } from './createNoteSchema';
import { CreateNoteUseCase } from './createNoteUseCase';

export interface Dependencies {
  createNoteUseCase: CreateNoteUseCase;
}

export const createNoteControllerFactory =
  ({ createNoteUseCase }: Dependencies) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { title, body } = req.body;

      const payload = { title, body };

      const validatedPayload = await validatePayload<CreateNoteSchema>(
        payload,
        createNoteSchema
      );

      const createdNoteId = await createNoteUseCase({
        ...validatedPayload,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        userId: (req as any).user.id,
      });

      return res.status(200).json({ createdNoteId });
    } catch (error) {
      next(error);
    }
  };
