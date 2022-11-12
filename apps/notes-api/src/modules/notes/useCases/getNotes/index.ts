import { getNotesControllerFactory } from './getNotesController';
import { getNotesUseCaseFactory } from './getNotesUseCase';
import { noteRepository } from '../../domain/repositories/index';

const getNotesUseCase = getNotesUseCaseFactory({ noteRepository });

const getNotesController = getNotesControllerFactory({
  getNotes: getNotesUseCase,
});

export { getNotesController, getNotesUseCase };
