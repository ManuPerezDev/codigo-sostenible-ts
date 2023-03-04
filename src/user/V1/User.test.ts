import { User } from "./User";

describe('User should', () => {
  it('create user', () => {
    const email = 'hola@gmail.com';
    const name = 'John';

    const user = User.create(name, email);

    expect(user.name).toBe(name);
    expect(user.email).toBe(email);
  });

  it('email validation should fail', () => {
    const invalidEmail = 'hola';
    const name = 'John';

    expect(() => User.create(name, invalidEmail)).toThrowError();
  });
});
