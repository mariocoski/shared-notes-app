import { Note } from '../../domain/Note';
import { NoteRepositoryInterface } from '../../domain/repositories/NoteRepositoryInterface';

export interface Dependencies {
  noteRepository: NoteRepositoryInterface;
}

export interface Request {
  userId: number;
}

export type GetNotes = (request: Request) => Promise<Note[]>;

export type GetNotesUseCaseFactory = (dependencies: Dependencies) => GetNotes;

export const getNotesUseCaseFactory =
  ({ noteRepository }: Dependencies) =>
  async ({ userId }: Request) => {
    return noteRepository.getAllByUserId(userId);
  };
