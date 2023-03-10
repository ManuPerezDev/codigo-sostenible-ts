/**
 * null | undefined | '' => 0
 * '1' => 1; '2' => 2
 * '1,2' => 3; '1,2,3' => 6
 * '1,2,a,3' => 6
 * //;/1;2;3 => 6; //·/1·2·3 => 6
 */

class StringCalculator {
  static add(expression: string) {
    if (!expression) { return 0; }

    if(this.hasCustomSeparator(expression)) {
      const matchedExpression = expression.match(/^\/\/(.*)\/(.*)/)
      const separator = matchedExpression[1]
      const onlyNumbersExpression = matchedExpression[2]
      const numbers = this.getNumbersFrom(onlyNumbersExpression, separator);
      return this.sum(numbers);
    }

    const numbers = this.getNumbersFrom(expression);
    return this.sum(numbers);
  }

  private static hasCustomSeparator(expression: string) {
    return expression.includes('/');
  }

  private static sum(numbers: string[]) {
    return numbers.reduce((acc, curr) => acc + Number(curr), 0);
  }

  private static getNumbersFrom(onlyNumbersExpression: string, separator: string = ',') {
    return onlyNumbersExpression.split(separator).filter(char => Number(char));
  }
}

describe('StringCalculator should', () => {
  it('should handle invalid values',  () => {
    expect(StringCalculator.add(null)).toBe(0);
    expect(StringCalculator.add(undefined)).toBe(0);
    expect(StringCalculator.add('')).toBe(0);
  });

  it('should handle single values', () => {
    expect(StringCalculator.add('1')).toBe(1);
    expect(StringCalculator.add('2')).toBe(2);
  });

  it('should sum values',  () => {
    expect(StringCalculator.add('1,2')).toBe(3);
    expect(StringCalculator.add('1,2,3')).toBe(6);
  });

  it('should sum values excluding non number characters',  () => {
    expect(StringCalculator.add('1,2,y')).toBe(3);
    expect(StringCalculator.add('1,2,a,3')).toBe(6);
  });

  it('should accept a custom separator',  () => {
    expect(StringCalculator.add('//·/1·2·3')).toBe(6);
    expect(StringCalculator.add('//;/1;2;3')).toBe(6);
  });
});
