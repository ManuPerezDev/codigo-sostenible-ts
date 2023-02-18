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

export const it = test

export function describe(description: string, callback: () => void) {
  console.log(description)
  callback()
}

export function expectThatList<T>(list: T[]) {
  return listMatchers(list);
}

function listMatchers<T>(list: T[]) {
  return {
    isExactly(...items: T[]) {
      expect(items.length).toBe(list.length);
      items.forEach((_, i) => {
        expect(items[i]).toBe(list[i]);
      });
    },
  };
}
