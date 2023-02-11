export function camelCaseConverter(text: string) {
  return text.split('-')
    .map(firstLetterToUpperCase).join('').split('_')
    .map(firstLetterToUpperCase).join('').split(' ')
    .map(firstLetterToUpperCase).join('')
}

function firstLetterToUpperCase(text: string) {
  const firstLetterUppercase = text.charAt(0).toUpperCase()
  const restOfText = text.substring(1, text.length)
  return firstLetterUppercase + restOfText
}
