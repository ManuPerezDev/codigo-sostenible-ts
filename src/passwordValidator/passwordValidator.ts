export function passwordValidator(password: string) {
  return containsMoreThanSixCharacters(password) &&
    containsAtLeastOneNumber(password) &&
    containsUnderscore(password) &&
    containsCapitalLetter(password) &&
    containsNonCapitalLetter(password)
}

function containsNonCapitalLetter(password: string) {
  const containsNonCapitalLetter = Boolean(password.match(/[a-z]/g))
  return containsNonCapitalLetter;
}

function containsCapitalLetter(password: string) {
  const containsCapitalLetter = Boolean(password.match(/[A-Z]/g))
  return containsCapitalLetter;
}

function containsUnderscore(password: string) {
  const containsUnderscore = Boolean(password.match(/_/g))
  return containsUnderscore;
}

function containsAtLeastOneNumber(password: string) {
  const containsAtLeastOneNumber = Boolean(password.match(/[0-9]/g))
  return containsAtLeastOneNumber;
}

function containsMoreThanSixCharacters(password: string) {
  const containsMoreThanSixCharacters = password.length >= 6;
  return containsMoreThanSixCharacters;
}
