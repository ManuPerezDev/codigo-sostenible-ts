export function passwordValidator(password: string) {
  return containsMoreThanSixCharacters(password) &&
    containsAtLeastOneNumber(password) &&
    containsUnderscore(password) &&
    containsCapitalLetter(password) &&
    containsNonCapitalLetter(password)
}

function containsNonCapitalLetter(password: string) {
  return /[a-z]/.test(password);
}

function containsCapitalLetter(password: string) {
  return /[A-Z]/.test(password);
}

function containsUnderscore(password: string) {
  return /_/.test(password);
}

function containsAtLeastOneNumber(password: string) {
  return /[0-9]/.test(password);
}

function containsMoreThanSixCharacters(password: string) {
  return password.length >= 6;
}
