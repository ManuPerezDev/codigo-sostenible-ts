export function expect<T>(expected: T) {
  return {
    toBe(result) {
      if (result !== expected) {
        throw new Error(`${result} is not equal to ${expected}`)
      }
    }
  }
}

export async function test(description, callback: () => void) {
  try {
    await callback()
    console.log('Success!', description)
  }catch (error) {
    console.log(description)
    console.log(error)
  }
}
