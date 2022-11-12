import generateJWT from '../../../../shared/core/utils/jwt/generateJWT';
import verifyPassword from '../../../../shared/core/utils/passwords/verifyPassword';
import { UserRepositoryInterface } from '../../domain/repositories/UserRepositoryInterface';
import { User } from '../../domain/User';

export interface Dependencies {
  userRepository: UserRepositoryInterface;
}

export interface Request {
  email: string;
  password: string;
}

export interface UserData {
  id: number;
  email: string;
  name: string;
}

export interface LoginResult {
  token: string;
  user: UserData;
}

export type LoginUseCase = (request: Request) => Promise<LoginResult>;

export type LoginUseCaseFactory = (dependencies: Dependencies) => LoginUseCase;

export const loginUserCaseFactory =
  ({ userRepository }: Dependencies) =>
  async ({ email, password }: Request) => {
    let user: User;
    try {
      user = await userRepository.getByEmail(email);
    } catch (err) {
      console.log('err', err);
      throw new Error('Invalid email and/or password');
    }

    const doesPasswordMatch = await verifyPassword(user.password, password);

    if (!doesPasswordMatch) {
      throw new Error('Invalid email and/or password');
    }

    const userData = {
      email: user.email.value,
      name: user.name,
      id: Number(user.id.toString()),
    };

    const token = generateJWT({
      data: userData,
    });

    return {
      token,
      user: userData,
    };
  };
