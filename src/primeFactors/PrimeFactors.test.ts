// 2 ⇒ [2]
// 2 * 2 ⇒ [2,2]
// 2 * 2 * 2 ⇒ [2,2,2]
// 3 ⇒ [3]
// 3 * 3 ⇒ [3,3]
// 3 * 2 ⇒ [2,3]
// 5 * 5 ⇒ [5,5]
// 5 * 7 * 11 * 3 ⇒ [3,5,7,11]

function primeFactors(num: number) {
  if (num < 1) throw new Error('Only positive numbers are allowed');
  if (num === 1) return [1];

  let factor = 2
  while(num % factor !== 0) {
    ++factor
  }
  const factors = [factor]
  const remainder = num / factor
  if(remainder > 1) {
    return factors.concat(primeFactors(remainder))
  }

  return factors
}

describe('PrimeFactors should', () => {
  it('calculate prime factors',  () => {
    expect(primeFactors(2)).toEqual([2]);
    expect(primeFactors(2 * 2)).toEqual([2, 2]);
    expect(primeFactors(2 * 2 * 2)).toEqual([2, 2, 2]);
    expect(primeFactors(3)).toEqual([3]);
    expect(primeFactors(3 * 3)).toEqual([3, 3]);
    expect(primeFactors(2 * 3)).toEqual([2, 3]);
    expect(primeFactors(5 * 5)).toEqual([5, 5]);
    expect(primeFactors(5 * 7 * 11 * 3)).toEqual([3, 5, 7, 11]);
  });

  it('knows that the first prime is nomber one', () => {
    expect(primeFactors(1)).toEqual([1]);
  });

  it('only accepts positive numbers', () => {
    expect(() => primeFactors(-5)).toThrow();
  });
});
