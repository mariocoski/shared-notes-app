import hashPassword from '../../../shared/core/utils/passwords/hashPassword';
import { Entity, UniqueEntityID } from '../../../shared/domain/Entity';
import { UserEmail } from './UserEmail';

export interface UserProps {
  email: UserEmail;
  name: string;
  password: string;
}

export class User extends Entity<UserProps> {
  get email(): UserEmail {
    return this.props.email;
  }

  get name(): string {
    return this.props.name;
  }

  get password(): string {
    return this.props.password;
  }

  public hashedPassword(): Promise<string> {
    return hashPassword(this.props.password);
  }

  private constructor(props: UserProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(props: UserProps, id?: UniqueEntityID): User {
    // Business rules
    return new User(props, id);
  }
}
