import { NOT_SET } from '../../../../../../shared/constants';
import connectionSource from '../../../../../../database/config/typeorm_config';
import { User as UserModel } from '../../../../../../database/entities/User';
import { User } from '../../../User';
import { UserRepositoryInterface } from '../../UserRepositoryInterface';
import { mapUserDBOtoDomain, mapUserDomainToDBO } from './mappers';
import { In } from 'typeorm';

export const createTypeormUserRepository = (): UserRepositoryInterface => {
  return {
    getAllByIds: async (userIds: number[]) => {
      const userDBOs = await connectionSource.getRepository(UserModel).find({
        where: { id: In(userIds) },
        order: { createdAt: 'DESC' },
      });

      return userDBOs.map(mapUserDBOtoDomain);
    },
    getByEmail: async (email: string) => {
      const userDBO = await connectionSource
        .getRepository(UserModel)
        .findOneBy({
          email: email.toLowerCase(),
        });

      if (!userDBO) {
        throw new Error('User not found');
      }

      return mapUserDBOtoDomain(userDBO);
    },
    getByName: async (name: string) => {
      const userDBO = await connectionSource
        .getRepository(UserModel)
        .findOneBy({
          name: name.toLowerCase(),
        });

      if (!userDBO) {
        throw new Error('User not found');
      }

      return mapUserDBOtoDomain(userDBO);
    },
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    save: async (user: User) => {
      const shouldInsertAUser = user.id.toString() === NOT_SET;
      const userDBO = await mapUserDomainToDBO(user);
      let userID: number;
      if (shouldInsertAUser) {
        const response = await connectionSource
          .getRepository(UserModel)
          .insert(userDBO);
        userID =
          Array.isArray(response?.identifiers) &&
          response.identifiers.length > 0 &&
          response.identifiers[0]?.id
            ? response.identifiers[0]?.id
            : undefined;
      } else {
        userID = Number(user.id.toString());
        await connectionSource
          .getRepository(UserModel)
          .update(userDBO, { id: userID });
      }

      return userID;
    },
  };
};
