import { User } from "./User";

interface UserRepository {
  save(user: User): void;
  exists(user: User): boolean;
}

interface Validator {
  validateEmail(email: string): boolean;
}

class CreateUser {
  constructor(private userRepository: UserRepository, private validator: Validator) {}

  run(user: User) {
    if (!this.validator.validateEmail(user.email)) {
      return;
    }
    if (this.userRepository.exists(user)) {
      return;
    }
    this.userRepository.save(user);
  }
}

describe('CreateUser should', () => {
  it('save user when email is valid', () => {
    const email = 'john@gmail.com';
    const user = new User('John', email);
    const userRepositoryMock = {
      exists: jest.fn().mockReturnValue(false),
      save: jest.fn()
    } as any as UserRepository;
    const validatorMock = { validateEmail: jest.fn().mockReturnValue(true) } as any as Validator;

    new CreateUser(userRepositoryMock, validatorMock).run(user)

    expect(validatorMock.validateEmail).toHaveBeenCalledWith(user.email);
    expect(userRepositoryMock.exists).toHaveBeenCalledWith(user);
    expect(userRepositoryMock.save).toHaveBeenCalledWith(user);
  });

  it('not save user when email is not valid', () => {
    const invalidEmail = 'gmail.com';
    const user = new User('John', invalidEmail);
    const userRepositoryMock = { save: jest.fn() } as any as UserRepository;
    const validatorMock = { validateEmail: jest.fn().mockReturnValue(false) } as any as Validator;

    new CreateUser(userRepositoryMock, validatorMock).run(user)

    expect(validatorMock.validateEmail).toHaveBeenCalledWith(user.email);
    expect(userRepositoryMock.save).not.toHaveBeenCalled();
  });

  it('not save user when already exists', () => {
    const invalidEmail = 'john@gmail.com';
    const user = new User('John', invalidEmail);
    const userRepositoryMock = {
      exists: jest.fn().mockReturnValue(true),
      save: jest.fn()
    } as any as UserRepository;
    const validatorMock = { validateEmail: jest.fn().mockReturnValue(true) } as any as Validator;

    new CreateUser(userRepositoryMock, validatorMock).run(user)

    expect(userRepositoryMock.exists).toHaveBeenCalledWith(user);
    expect(userRepositoryMock.save).not.toHaveBeenCalledWith(user);
  });
});
