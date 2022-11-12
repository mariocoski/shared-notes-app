import { validatePayload } from '../../../../shared/core/utils/validation/validatePayload';
import { NextFunction, Request, Response } from 'express';
import { GetNoteSchema, getNoteSchema } from './getNoteSchema';
import { GetNote } from './getNoteUseCase';

export interface Dependencies {
  getNote: GetNote;
}

export const getNoteControllerFactory =
  ({ getNote }: Dependencies) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { noteId } = req.params;

      const payload = { noteId };

      const validatedPayload = await validatePayload<GetNoteSchema>(
        payload,
        getNoteSchema
      );

      const { note, sharedWithUsers } = await getNote({
        ...validatedPayload,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        userId: (req as any).user.id,
      });

      const mappedSharedWithUsers = sharedWithUsers.map((user) => ({
        id: Number(user.id.toString()),
        name: user.name,
        email: user.email.value,
      }));

      const mappedNote = {
        id: note.id.toValue(),
        title: note.title,
        body: note.body,
        createdAt: note.createdAt,
        updatedAt: note.updatedAt,
        createdByUserId: note.createdByUserId,
        sharedWithUserIds: note.sharedWithUserIds,
        sharedWithUsers: mappedSharedWithUsers,
      };

      return res.status(200).json(mappedNote);
    } catch (error) {
      next(error);
    }
  };
