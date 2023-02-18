import {average, sum} from "./stats";
import * as statsAsync from "./statsAsync";

describe('Stats should', () => {
  test('calculate the sum of all elements of the array', () => {
    const result = sum([1, 2, 3])
    const expected = 6
    expect(expected).toBe(result)
  })

  test('calculates the average of all elements of the array', () => {
    const result = average([1, 2, 3])
    const expected = 2
    expect(expected).toBe(result)
  })
})

describe('Stats async should', () => {
  test('calculate the sum of all elements of the array async', async() => {
    const result = await statsAsync.sum([1, 2, 3])
    const expected = 6
    expect(expected).toBe(result)
  })

  test('calculates the average of all elements of the array async', async() => {
    const result = await statsAsync.average([1, 2, 3])
    const expected = 2
    expect(expected).toBe(result)
  })
})
