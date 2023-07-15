// wordWrap('',5) ⇒ ''
// wordWrap('hello',5) ⇒ 'hello'
// wordWrap('longword',4) ⇒ 'long\nword'
// wordWrap('reallylongword',4) ⇒ 'real\nlylo\nngwo\nrd'
// wordWrap('abc def',4) ⇒ 'abc\ndef'
// wordWrap('abc def ghi',4) ⇒ 'abc\ndef\nghi'
// wordWrap(' abcdf',4) ⇒ '\nabcd\nf'
// wordWrap(null,5) ⇒ ''
// wordWrap('hello',-5) ⇒ throw exception

function wordWrapNoPrimitives(expression: Expression, columnWidth: ColumnWidth) {
  if (!expression.isLargerThan(columnWidth)) {
    return expression.value()
  }

  return expression.wrap(columnWidth) + '\n' + wordWrap(expression.toWrap(columnWidth), columnWidth.value())
}

function wordWrap(expression: string, columnWidth: number) {
  return wordWrapNoPrimitives(Expression.create(expression), ColumnWidth.create(columnWidth))
}

class ColumnWidth {
  private constructor(private columnWidth: number) { }

  static create(columnWidth: number) {
    if(columnWidth < 0) {
      throw new Error('Column size not allowed.')
    }
    return new ColumnWidth(columnWidth)
  }

  value() {
      return this.columnWidth
  }
}

class Expression {
  private constructor(private expression: string) {}

  static create(expression: string) {
    if (!expression) {
      return new Expression('')
    }

    return new Expression(expression)
  }

  isLargerThan(columnWidth: ColumnWidth) {
    return this.expression.length > columnWidth.value()
  }

  isFirstCharacterAnSpace() {
    return this.expression[0] === ' '
  }

  wrap(columnWidth: ColumnWidth) {
    if(this.isFirstCharacterAnSpace()) {
      return '\n' + this.expression.slice(1, columnWidth.value() + 1).trim()
    }
    return this.expression.slice(0, columnWidth.value()).trim()
  }

  toWrap(columnWidth: ColumnWidth) {
    if(this.isFirstCharacterAnSpace()) {
      return this.expression.slice(columnWidth.value() + 1, this.expression.length)
    }
    return this.expression.slice(columnWidth.value(), this.expression.length)

  }

  value() {
    return this.expression
  }
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
