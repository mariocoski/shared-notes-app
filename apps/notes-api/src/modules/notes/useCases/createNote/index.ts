import { createNoteControllerFactory } from './createNoteController';
import { createNoteUseCaseFactory } from './createNoteUseCase';
import { noteRepository } from '../../domain/repositories/index';

const createNoteUseCase = createNoteUseCaseFactory({ noteRepository });

const createNoteController = createNoteControllerFactory({ createNoteUseCase });

export { createNoteController, createNoteUseCase };
