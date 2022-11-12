import { NextFunction, Request, Response } from 'express';
import { GetNotes } from './getNotesUseCase';

export interface Dependencies {
  getNotes: GetNotes;
}

export const getNotesControllerFactory =
  ({ getNotes }: Dependencies) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const notes = await getNotes({
       // eslint-disable-next-line @typescript-eslint/no-explicit-any
       userId: (req as any).user.id,
      });

      const mappedNotes = notes.map((note) => {
        return {
          id: note.id.toValue(),
          title: note.title,
          body: note.body,
          createdAt: note.createdAt,
          updatedAt: note.updatedAt,
          createdByUserId: note.createdByUserId,
          sharedWithUserIds: note.sharedWithUserIds,
        };
      });

      return res.status(200).json(mappedNotes);
    } catch (error) {
      next(error);
    }
  };
