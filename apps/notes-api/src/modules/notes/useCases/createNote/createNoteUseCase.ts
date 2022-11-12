import generateJWT from '../../../../shared/core/utils/jwt/generateJWT';
import verifyPassword from '../../../../shared/core/utils/passwords/verifyPassword';
import { Note } from '../../domain/Note';
import { NoteRepositoryInterface } from '../../domain/repositories/NoteRepositoryInterface';

export interface Dependencies {
  noteRepository: NoteRepositoryInterface;
}

export interface Request {
  title: string;
  body: string;
  userId: number;
}

export type CreateNoteUseCase = (request: Request) => Promise<number>;

export type CreateNoteUseCaseFactory = (
  dependencies: Dependencies
) => CreateNoteUseCase;

export const createNoteUseCaseFactory =
  ({ noteRepository }: Dependencies) =>
  async ({ title, body, userId }: Request) => {
    const note = Note.create({
      createdByUserId: userId,
      title,
      body,
      sharedWithUserIds: [],
    });

    return noteRepository.save(note);
  };
