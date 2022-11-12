import { deleteNoteControllerFactory } from './deleteNoteController';
import { deleteNoteUseCaseFactory } from './deleteNoteUseCase';
import { noteRepository } from '../../domain/repositories/index';

const deleteNoteUseCase = deleteNoteUseCaseFactory({ noteRepository });

const deleteNoteController = deleteNoteControllerFactory({ deleteNoteUseCase });

export { deleteNoteController, deleteNoteUseCase };
