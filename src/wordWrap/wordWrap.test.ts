// wordWrap('',5) ⇒ ''
// wordWrap('hello',5) ⇒ 'hello'
// wordWrap('longword',4) ⇒ 'long\nword'
// wordWrap('reallylongword',4) ⇒ 'real\nlylo\nngwo\nrd'
// wordWrap('abc def',4) ⇒ 'abc\ndef'
// wordWrap('abc def ghi',4) ⇒ 'abc\ndef\nghi'
// wordWrap(' abcdf',4) ⇒ '\nabcd\nf'
// wordWrap(null,5) ⇒ ''
// wordWrap('hello',-5) ⇒ throw exception

function wordWrap(expression: string, columnSize: number) {
  if(columnSize < 0) {
    throw new Error('Column size not allowed.')
  }

  if(!expression) {
    return ''
  }

  if(expression.length > columnSize) {
    if(expression[0] === ' ') {
      const part1 = expression.slice(1, columnSize + 1).trim()
      const part2 = expression.slice(columnSize + 1, expression.length)
      return  '\n' + part1 + '\n' + part2
    }
    const part1 = expression.slice(0, columnSize).trim()
    const part2 = expression.slice(columnSize, expression.length)

    return part1 + '\n' + wordWrap(part2, columnSize)
  }
  return expression
}

describe('WordWrap should', () => {
  it('should not wrap an empty expression',  () => {
    expect(wordWrap('', 5)).toBe('')
  });

  it('should not wrap an empty expression with less characters than column size',  () => {
    expect(wordWrap('hello', 5)).toBe('hello')
  });

  it('should wrap an expression with more characters than column size',  () => {
    expect(wordWrap('longword', 4)).toBe('long\nword')
  });

  it('should wrap an expression multiple times',  () => {
    expect(wordWrap('reallylongword', 4)).toBe('real\nlylo\nngwo\nrd')
  });

  it('should wrap an expression taking spaces into account',  () => {
    expect(wordWrap('abc def', 4)).toBe('abc\ndef')
  });

  it('should wrap an expression taking multiple spaces into account',  () => {
    expect(wordWrap('abc def ghi', 4)).toBe('abc\ndef\nghi')
  });

  it('should wrap an expression taking into account initial spaces',  () => {
    expect(wordWrap(' abcdf', 4)).toBe('\nabcd\nf')
  });

  it('should not wrap if the input is null',  () => {
    expect(wordWrap(null, 4)).toBe('')
  });

  it('should not wrap and send an error if the column size is negative',  () => {
    expect(() => wordWrap('hello', -4)).toThrowError()
  });
});
