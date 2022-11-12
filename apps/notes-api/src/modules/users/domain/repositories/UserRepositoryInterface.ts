import { User } from '../User';

export interface UserRepositoryInterface {
  getByEmail: (email: string) => Promise<User>;
  getByName: (name: string) => Promise<User>;
  getAllByIds: (userIds: number[]) => Promise<User[]>;
  save: (user: User) => Promise<number>;
}
