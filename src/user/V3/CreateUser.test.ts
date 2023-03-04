import { User } from "./User";

type Unit = 'Unit';

class Result<Error,Value> {
  private constructor(readonly error?: Error, readonly value?: Value) { }

  hasError() {
    return this.error !== null;
  }

  static createWith<Error,Value>(error: Error): Result<Error,Value> {
    return new Result(error, null);
  }

  static createWithValue<Error,Value>(value: Value): Result<Error,Value> {
    return new Result(null, value);
  }
}
enum UserRepositoryErrors {
  USER_ALREADY_EXISTS = 'USER_ALREADY_EXISTS'
}

interface UserRepository {
  save(user: User): Result<UserRepositoryErrors, Unit>;
}

interface Validator {
  validateEmail(email: string): boolean;
}

enum CreateUserErrors {
  CANNOT_BE_CREATE = 'CANNOT_BE_CREATE',
  EMAIL_IS_NOT_VALID = 'EMAIL_IS_NOT_VALID'
}

class CreateUser {
  constructor(private userRepository: UserRepository, private validator: Validator) {}

  run(user: User): Result<CreateUserErrors, Unit> {
    if (!this.validator.validateEmail(user.email)) {
      return Result.createWith(CreateUserErrors.EMAIL_IS_NOT_VALID)
    }
    const result = this.userRepository.save(user);
    if (result.hasError()) {
      return Result.createWith(CreateUserErrors.CANNOT_BE_CREATE);
    }
    return Result.createWithValue('' as Unit);
  }
}

describe('CreateUser should', () => {
  it('save user when email is valid', () => {
    const email = 'john@gmail.com';
    const user = new User('John', email);
    const userRepositoryMock = {
      save: jest.fn().mockReturnValue(Result.createWithValue<UserRepositoryErrors, Unit>('' as Unit))
    } as any as UserRepository;
    const validatorMock = { validateEmail: jest.fn().mockReturnValue(true) } as any as Validator;

    const result = new CreateUser(userRepositoryMock, validatorMock).run(user)

    expect(validatorMock.validateEmail).toHaveBeenCalledWith(user.email);
    expect(userRepositoryMock.save).toHaveBeenCalledWith(user);
    expect(result.hasError()).toBeFalsy();
  });

  it('not save user when email is not valid', () => {
    const invalidEmail = 'gmail.com';
    const user = new User('John', invalidEmail);
    const userRepositoryMock = { save: jest.fn() } as any as UserRepository;
    const validatorMock = { validateEmail: jest.fn().mockReturnValue(false) } as any as Validator;

    const result = new CreateUser(userRepositoryMock, validatorMock).run(user)

    expect(validatorMock.validateEmail).toHaveBeenCalledWith(user.email);
    expect(userRepositoryMock.save).not.toHaveBeenCalled();
    expect(result.hasError()).toBeTruthy();
  });

  it('not save user when already exists', () => {
    const invalidEmail = 'john@gmail.com';
    const user = new User('John', invalidEmail);
    const userRepositoryMock = {
      save: jest.fn().mockReturnValue(Result.createWith<UserRepositoryErrors, Unit>(UserRepositoryErrors.USER_ALREADY_EXISTS))
    } as any as UserRepository;
    const validatorMock = { validateEmail: jest.fn().mockReturnValue(true) } as any as Validator;

    const result = new CreateUser(userRepositoryMock, validatorMock).run(user)

    expect(userRepositoryMock.save).toHaveBeenCalledWith(user);
    expect(result.hasError()).toBeTruthy();
    expect(result.error).toBe(CreateUserErrors.CANNOT_BE_CREATE);
  });
});
