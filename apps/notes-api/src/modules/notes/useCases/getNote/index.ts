import { getNoteControllerFactory } from './getNoteController';
import { getNoteUseCaseFactory } from './getNoteUseCase';
import { noteRepository } from '../../domain/repositories/index';
import { userRepository } from '../../../users/domain/repositories/index';

const getNoteUseCase = getNoteUseCaseFactory({
  noteRepository,
  userRepository,
});

const getNoteController = getNoteControllerFactory({
  getNote: getNoteUseCase,
});

export { getNoteController, getNoteUseCase };
