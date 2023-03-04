export class User {
  private constructor(readonly name: string, readonly email: string) {}

  static create(name: string, email: string) {
    if (!email.includes('@')) {
      throw new Error('Invalid email');
    }

    return new User(name, email);
  }
}
