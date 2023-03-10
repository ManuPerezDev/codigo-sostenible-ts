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

    if(expression.includes('/')) {
      const separatorExpression = expression.substring(0, 3)
      const separator = separatorExpression.charAt(2)
      const restExpression = expression.substring(4, expression.length)

      const numbers = restExpression.split(separator).filter(char => Number(char))
      return numbers.reduce((acc, curr) => acc + Number(curr), 0);
    }

    const separator = ',';
    const numbers = expression.split(separator).filter(char => Number(char))
    return numbers.reduce((acc, curr) => acc + Number(curr), 0);
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
