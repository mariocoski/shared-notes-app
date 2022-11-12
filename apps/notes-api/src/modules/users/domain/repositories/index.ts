import { createTypeormUserRepository } from './implementations/typeorm/userRepository';

export const createUserRepository = () => {
  return createTypeormUserRepository();
};

const userRepository = createUserRepository();

export { userRepository };
