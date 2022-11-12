import { createTypeormNoteRepository } from './implementations/typeorm/noteRepository';

export const createNoteRepository = () => {
  return createTypeormNoteRepository();
};

const noteRepository = createNoteRepository();

export { noteRepository };
