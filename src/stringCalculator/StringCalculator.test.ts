/**
 * null | undefined | '' => 0
 * '1' => 1; '2' => 2
 * '1,2' => 3; '1,2,3' => 6
 * '1,2,a,3' => 6
 * '//;/1;2;3' => 6; //·/1·2·3 => 6
 * '1\n2,3' => 6
 * '1,-2,-3' // error: negatives not allowed: -2 -3
 * '1,2000,3' => 4
 * More use cases: https://www.codurance.com/katalyst/string-calculator
 */

class StringCalculator {
  static add(expression: string) {
    if (!expression) { return 0; }

    if(this.hasCustomSeparator(expression)) {
      const matchedExpression = expression.match(/^\/\/(.*)\/(.*)/)
      const customSeparator = matchedExpression[1]
      const onlyNumbersExpression = matchedExpression[2]
      const numbers = this.getNumbersFrom(onlyNumbersExpression, customSeparator);
      this.checkNegative(numbers)
      return this.sum(numbers);
    }

    const numbers = this.getNumbersFrom(expression);
    this.checkNegative(numbers)
    return this.sum(numbers);
  }

  private static hasCustomSeparator(expression: string) {
    return expression.includes('/');
  }

  private static sum(numbers: number[]) {
    return numbers.reduce((acc, curr) => acc + curr, 0);
  }

  private static getNumbersFrom(onlyNumbersExpression: string, customSeparator?: string) {
    const separator = customSeparator ? customSeparator : /[\n,]/g
    return onlyNumbersExpression.split(separator)
      .filter(Number)
      .map(Number)
      .filter(number => number < 1000);
  }

  private static checkNegative(numbers: number[]) {
    const negativeNumbers = numbers.reduce((acc, curr) => {
      if(curr < 0) {
        return [...acc, curr]
      }
      return acc
    }, [])

    if(negativeNumbers.length > 0) {
      const stringifiedNegativeNumbers = negativeNumbers.join(' ')
      throw new Error(`negatives not allowed: ${stringifiedNegativeNumbers}`)
    }
  }
}

describe('StringCalculator should', () => {
  it('handle invalid values',  () => {
    expect(StringCalculator.add(null)).toBe(0);
    expect(StringCalculator.add(undefined)).toBe(0);
    expect(StringCalculator.add('')).toBe(0);
  });

  it('handle single values', () => {
    expect(StringCalculator.add('1')).toBe(1);
    expect(StringCalculator.add('2')).toBe(2);
  });

  it('sum values',  () => {
    expect(StringCalculator.add('1,2')).toBe(3);
    expect(StringCalculator.add('1,2,3')).toBe(6);
  });

  it('sum values excluding non number characters',  () => {
    expect(StringCalculator.add('1,2,y')).toBe(3);
    expect(StringCalculator.add('1,2,a,3')).toBe(6);
    expect(StringCalculator.add('1a,2,a,3')).toBe(5);
  });

  it('accept a custom separator',  () => {
    expect(StringCalculator.add('//·/1·2·3')).toBe(6);
    expect(StringCalculator.add('//;/1;2;3')).toBe(6);
    expect(StringCalculator.add('//&/1;2;3')).toBe(0);
  });

  it('accept a line break as default separator',  () => {
    expect(StringCalculator.add('1\n2,3')).toBe(6);
  });

  it('does not accepts negative numbers',  () => {
    expect(() => StringCalculator.add('1,-2,-3')).toThrowError(new Error('negatives not allowed: -2 -3'));
    expect(() => StringCalculator.add('//%/1%-3%-4')).toThrowError(new Error('negatives not allowed: -3 -4'));
  });

  it('ignore numbers greater than 1000',  () => {
    expect(StringCalculator.add('1,2000,3')).toBe(4);
    expect(StringCalculator.add('1001,2,3')).toBe(5);
  });
});
