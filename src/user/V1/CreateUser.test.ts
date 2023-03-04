import { User } from "./User";

class CreateUser {
  constructor(private userRepository: UserRepository) {}

  run(user: User) {
    this.userRepository.save(user);
  }
}

describe('CreateUser should', () => {
  it('save user', () => {
    const user = User.create('John', 'jonh@gmail.com');
    const userRepository = { save: jest.fn() } as any as UserRepository;

    new CreateUser(userRepository).run(user)

    expect(userRepository.save).toHaveBeenCalledWith(user);
  });
});

interface UserRepository {
  save(user: User): void;
}
