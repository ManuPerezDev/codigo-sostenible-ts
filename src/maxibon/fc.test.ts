import fc from 'fast-check'

function sum(a: number, b: number) {
  return a + b
}

describe('Test', () => {
  it('should pass', () => {
    fc.assert(
      fc.property(fc.integer(), (num) => { expect(sum(num, 0)).toEqual(num) })
    )
  });

  it('should pass2', () => {
    fc.assert(
      fc.property(fc.integer(),fc.integer(), (num1, num2) => { expect(sum(num1, num2)).toEqual(sum(num2, num1)) })
    )
  });
});
