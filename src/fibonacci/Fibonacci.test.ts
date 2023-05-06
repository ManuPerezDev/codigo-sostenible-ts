function fibonacci(position: number) {
  if(position === 0) return 0
  if(position === 1) return 1
  return fibonacci(position - 1) + fibonacci(position - 2)
}

// 0,1,1,2,3,5,8,12

describe('Fibonacci should', () => {
  it('return 0 in position 0',  () => {
    expect(fibonacci(0)).toBe(0)
  });

  it('return 1 in position 1',  () => {
    expect(fibonacci(1)).toBe(1)
  });

  it('return the sum of two preceding positions from position 2 onwards',  () => {
    expect(fibonacci(2)).toBe(1)
    expect(fibonacci(3)).toBe(2)
    expect(fibonacci(4)).toBe(3)
    expect(fibonacci(5)).toBe(5)
  });
});
