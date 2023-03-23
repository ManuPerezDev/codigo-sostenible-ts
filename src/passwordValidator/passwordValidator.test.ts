import { passwordValidator } from "./passwordValidator";

// Tener una longitud de al menos seis caracteres
// Contener algún número
// Contener alguna letra mayúscula
// Contener alguna letra minúscula
// Contener algún guion bajo

describe('passwordValidator should', () => {
  it('validates a password with all requirements', () => {
    expect(passwordValidator('Password12_')).toBe(true);
  })

  it('not validate a password without at least 6 characters',  () => {
    expect(passwordValidator('passw')).toBe(false);
  });

  it('not validate a password that not contains at least one number', () => {
    expect(passwordValidator('Password_')).toBe(false)
  })

  it('not validate a password that not contains at underscore', () => {
    expect(passwordValidator('Password12')).toBe(false)
  })

  it('not validate a password that not contains at least one capital letter', () => {
    expect(passwordValidator('password12_')).toBe(false)
  })

  it('not validate a password that not contains at least one non capital letter', () => {
    expect(passwordValidator('PASSWORD12_')).toBe(false)
  })
});
