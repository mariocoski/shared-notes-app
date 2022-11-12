import { UserRepositoryInterface } from '../../../users/domain/repositories/UserRepositoryInterface';
import { isValidEmail } from '../../../users/domain/UserEmail';
import { NoteRepositoryInterface } from '../../domain/repositories/NoteRepositoryInterface';

export interface Dependencies {
  noteRepository: NoteRepositoryInterface;
  userRepository: UserRepositoryInterface;
}

export interface Request {
  email?: string;
  name?: string;
  userId: number;
  noteId: number;
}

export type ShareNoteUseCase = (request: Request) => Promise<void>;

export type ShareNoteUseCaseFactory = (
  dependencies: Dependencies
) => ShareNoteUseCase;

export const shareNoteUseCaseFactory =
  ({ noteRepository, userRepository }: Dependencies) =>
  async ({ email, name, noteId, userId }: Request) => {
    const sharingViaEmail = email;

    if (sharingViaEmail && !isValidEmail(email)) {
      throw new Error('Invalid email');
    }

    const note = await noteRepository.getNoteIdAndUserId(noteId, userId);

    if (note.createdByUserId !== userId) {
      throw new Error('You are unauthorized to share the note!');
    }

    const user = sharingViaEmail
      ? await userRepository.getByEmail(email)
      : await userRepository.getByName(name);

    const userIdToBeGrantedAccess = Number(user.id.toValue());

    const userAlreadyHasAccessToNote =
      Number(user.id.toValue() === note.createdByUserId) ||
      note.sharedWithUserIds.includes(userIdToBeGrantedAccess);

    if (userAlreadyHasAccessToNote) {
      // indepotent behaviour
      return;
    }

    note.shareWithUsers([userIdToBeGrantedAccess]);

    await noteRepository.save(note);
  };
