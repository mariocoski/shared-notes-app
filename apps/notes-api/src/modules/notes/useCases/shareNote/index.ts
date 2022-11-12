import { shareNoteControllerFactory } from './shareNoteController';
import { shareNoteUseCaseFactory } from './shareNoteUseCase';
import { noteRepository } from '../../domain/repositories/index';
import { userRepository } from '../../../users/domain/repositories/index';

const shareNoteUseCase = shareNoteUseCaseFactory({
  noteRepository,
  userRepository,
});

const shareNoteController = shareNoteControllerFactory({ shareNoteUseCase });

export { shareNoteController, shareNoteUseCase };
