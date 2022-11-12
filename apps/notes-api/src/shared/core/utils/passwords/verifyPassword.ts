import * as argon2 from 'argon2';

const verifyPassword = (
  hashedPassword: string,
  password: string
): Promise<boolean> => argon2.verify(hashedPassword, password);

export default verifyPassword;
