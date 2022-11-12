import { User } from '../../../users/domain/User';
import { UserRepositoryInterface } from '../../../users/domain/repositories/UserRepositoryInterface';
import { Note } from '../../domain/Note';
import { NoteRepositoryInterface } from '../../domain/repositories/NoteRepositoryInterface';

export interface Dependencies {
  noteRepository: NoteRepositoryInterface;
  userRepository: UserRepositoryInterface;
}

export interface Request {
  userId: number;
  noteId: number;
}

export type GetNote = (
  request: Request
) => Promise<{ note: Note; sharedWithUsers: User[] }>;

export type GetNoteUseCaseFactory = (dependencies: Dependencies) => GetNote;

export const getNoteUseCaseFactory =
  ({ noteRepository, userRepository }: Dependencies) =>
  async ({ userId, noteId }: Request) => {
    const note = await noteRepository.getNoteIdAndUserId(noteId, userId);

    const sharedWithUsers = await userRepository.getAllByIds(
      note.sharedWithUserIds
    );

    return { note, sharedWithUsers };
  };
