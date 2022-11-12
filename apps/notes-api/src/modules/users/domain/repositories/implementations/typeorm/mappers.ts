import { UniqueEntityID } from '../../../../../../shared/domain/Entity';
import { User as UserDBO } from '../../../../../../database/entities/User';
import { User } from '../../../User';
import { UserEmail } from '../../../UserEmail';

export const mapUserDBOtoDomain = (userDBO: UserDBO): User => {
  return User.create(
    {
      name: userDBO.name,
      email: UserEmail.create(userDBO.email),
      password: userDBO.password,
    },
    new UniqueEntityID(userDBO.id)
  );
};

export const mapUserDomainToDBO = async (
  userDomain: User
): Promise<Partial<UserDBO>> => {
  return {
    name: userDomain.name,
    email: userDomain.email.value,
    password: await userDomain.hashedPassword(),
  };
};
