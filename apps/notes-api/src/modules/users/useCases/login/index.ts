import { loginControllerFactory } from './loginController';
import { loginUserCaseFactory } from './loginUseCase';
import { userRepository } from '../../domain/repositories/index';

const loginUseCase = loginUserCaseFactory({ userRepository });

const loginController = loginControllerFactory({ loginUseCase });

export { loginController, loginUseCase };
