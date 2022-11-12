import { ValueObject } from '../../../shared/domain/ValueObject';

export const isValidEmail = (value: string) => {
  const EMAIL_REGEXP =
    /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return EMAIL_REGEXP.test(value);
};

export interface UserEmailProps {
  value: string;
  [index: string]: unknown;
}

export class UserEmail extends ValueObject<UserEmailProps> {
  get value(): string {
    return this.props.value;
  }

  private constructor(props: UserEmailProps) {
    super(props);
  }

  private static isValidEmail(email: string) {
    return isValidEmail(email);
  }

  private static format(email: string): string {
    return email.trim().toLowerCase();
  }

  public static create(email: string): UserEmail {
    if (!this.isValidEmail(email)) {
      throw new Error('Invalid email');
    }
    return new UserEmail({ value: email });
  }
}
