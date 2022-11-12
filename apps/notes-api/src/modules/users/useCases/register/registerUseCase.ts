import generateJWT from '../../../../shared/core/utils/jwt/generateJWT';
import verifyPassword from '../../../../shared/core/utils/passwords/verifyPassword';
import { UserRepositoryInterface } from '../../domain/repositories/UserRepositoryInterface';
import { User } from '../../domain/User';
import { UserEmail } from '../../domain/UserEmail';

export interface Dependencies {
  userRepository: UserRepositoryInterface;
}

export interface Request {
  email: string;
  password: string;
  name: string;
}

export interface UserData {
  id: number;
  email: string;
  name: string;
}

export interface RegisterResult {
  token: string;
  user: UserData;
}

export type RegisterUseCase = (request: Request) => Promise<RegisterResult>;

export type RegisterUseCaseFactory = (
  dependencies: Dependencies
) => RegisterUseCase;

export const registerUserCaseFactory =
  ({ userRepository }: Dependencies) =>
  async ({ email, password, name }: Request) => {
    const user = User.create({
      email: UserEmail.create(email),
      name,
      password,
    });

    const createdUserId = await userRepository.save(user);

    const userData = {
      email: user.email.value,
      name: user.name,
      id: createdUserId,
    };

    const token = generateJWT({
      data: userData,
    });

    return {
      token,
      user: userData,
    };
  };
