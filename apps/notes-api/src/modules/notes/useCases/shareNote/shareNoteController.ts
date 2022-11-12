import { validatePayload } from '../../../../shared/core/utils/validation/validatePayload';
import { NextFunction, Request, Response } from 'express';
import { shareNoteSchema, ShareNoteSchema } from './shareNoteSchema';
import { ShareNoteUseCase } from './shareNoteUseCase';

export interface Dependencies {
  shareNoteUseCase: ShareNoteUseCase;
}

export const shareNoteControllerFactory =
  ({ shareNoteUseCase }: Dependencies) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, name } = req.body;
      const { noteId } = req.params;

      const payload = { email, name, noteId };

      const validatedPayload = await validatePayload<ShareNoteSchema>(
        payload,
        shareNoteSchema
      );

      if (email && name) {
        throw new Error('You must specify email or name, not both');
      }

      await shareNoteUseCase({
        ...validatedPayload,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        userId: (req as any).user.id,
      });

      return res.sendStatus(204);
    } catch (error) {
      next(error);
    }
  };
