import { NoteRepositoryInterface } from '../../domain/repositories/NoteRepositoryInterface';

export interface Dependencies {
  noteRepository: NoteRepositoryInterface;
}

export interface Request {
  noteId: number;
  userId: number;
}

export type DeleteNoteUseCase = (request: Request) => Promise<void>;

export type DeleteNoteUseCaseFactory = (
  dependencies: Dependencies
) => DeleteNoteUseCase;

export const deleteNoteUseCaseFactory =
  ({ noteRepository }: Dependencies) =>
  async ({ noteId, userId }: Request) => {
    const note = await noteRepository.getNoteIdAndUserId(noteId, userId);
    if (note.createdByUserId !== userId) {
      throw new Error('Forbidden');
    }

    note.delete();

    await noteRepository.save(note);
  };
