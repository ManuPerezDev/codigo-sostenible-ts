// Para el número 1 el resultado debe ser "1".
// Para el número 3 el resultado debe ser “fizz”
// Para el número 5 el resultado debe ser “buzz”
// Para el número 15 el resultado debe ser “fizzbuzz”
// Para cualquier número divisible entre 3 el resultado debe ser “fizz”
// Para cualquier número divisible entre 5 el resultado debe ser “buzz”
// Para cualquier número divisible entre 15 el resultado debe de ser “fizzbuzz”
// Para el resto de números el resultado debería ser el propio número recibido

import {fizzbuzz} from "./fizzbuzz";

describe('fizzbuzz should', () => {
  it('return one for input one ',  () => {
    expect(fizzbuzz(1)).toBe("1")
  });

  it('return fizz for input three', () => {
    expect(fizzbuzz(3)).toBe("fizz")
  });

  it('return buzz for input five', () => {
    expect(fizzbuzz(5)).toBe("buzz")
  });

  it('return buzz for input fifteen', () => {
    expect(fizzbuzz(15)).toBe("fizzbuzz")
  });

  it('return fizz for any input divisible by three', () => {
    expect(fizzbuzz(3)).toBe("fizz")
    expect(fizzbuzz(6)).toBe("fizz")
    expect(fizzbuzz(9)).toBe("fizz")
  });

  it('return buzz for any input divisible by five', () => {
    expect(fizzbuzz(5)).toBe("buzz")
    expect(fizzbuzz(10)).toBe("buzz")
    expect(fizzbuzz(20)).toBe("buzz")
  });

  it('return fizzbuzz for any input divisible by three and five', () => {
    expect(fizzbuzz(15)).toBe("fizzbuzz")
    expect(fizzbuzz(30)).toBe("fizzbuzz")
    expect(fizzbuzz(45)).toBe("fizzbuzz")
  });

  it('return same number for ordinary input', () => {
    expect(fizzbuzz(2)).toBe("2")
    expect(fizzbuzz(4)).toBe("4")
  });
});
