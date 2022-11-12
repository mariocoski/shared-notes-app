import { Note } from '../Note';

export interface NoteRepositoryInterface { 
  getAllByUserId: (userId: number) => Promise<Note[]>;
  getNoteIdAndUserId: (noteId: number, userId: number) => Promise<Note>;
  save: (note: Note) => Promise<number>;
}
