import { validatePayload } from '../../../../shared/core/utils/validation/validatePayload';
import { NextFunction, Request, Response } from 'express';
import { deleteNoteSchema, DeleteNoteSchema } from './createNoteSchema';
import { DeleteNoteUseCase } from './deleteNoteUseCase';

export interface Dependencies {
  deleteNoteUseCase: DeleteNoteUseCase;
}

export const deleteNoteControllerFactory =
  ({ deleteNoteUseCase }: Dependencies) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { noteId } = req.params;

      const payload = { noteId };

      const validatedPayload = await validatePayload<DeleteNoteSchema>(
        payload,
        deleteNoteSchema
      );

      try {
        await deleteNoteUseCase({
          ...validatedPayload,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          userId: (req as any).user.id,
        });

        return res.sendStatus(204);
      } catch (error) {
        // MVP only, later "instanceOf" to be used to recognize the custom domain exceptions
        if (error.message === 'Note not found') {
          // indepotent if already deleted
          return res.status(404).json({ message: 'Not Found' });
        }
      }
    } catch (error) {
      next(error);
    }
  };
