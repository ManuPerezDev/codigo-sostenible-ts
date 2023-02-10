export function fizzbuzz(number: number) {
  const isDivisibleByThree = number % 3 === 0;
  const isDivisibleByFive = number % 5 === 0;

  if(isDivisibleByThree && isDivisibleByFive) {
    return "fizzbuzz"
  }

  if(isDivisibleByThree) {
    return "fizz"
  }

  if(isDivisibleByFive) {
    return "buzz"
  }

  return number.toString()
}
