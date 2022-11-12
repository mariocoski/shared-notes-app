import { registerControllerFactory } from './registerController';
import { registerUserCaseFactory } from './registerUseCase';
import { userRepository } from '../../domain/repositories/index';

const registerUseCase = registerUserCaseFactory({ userRepository });

const registerController = registerControllerFactory({ registerUseCase });

export { registerController, registerUseCase };
