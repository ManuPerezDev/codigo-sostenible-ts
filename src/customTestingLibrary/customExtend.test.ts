declare namespace jest{
  interface Matchers<R>{
    customToBe(value): CustomMatcherResult;
    isExactly(value): CustomMatcherResult;
  }
}

expect.extend({
  customToBe(expected, received) {
    return {
      pass: expected === received,
      message: () => `Expected: ${expected} \nReceived: ${received}`,
    };
  },
  isExactly<T>(expectedList: T[], ...values: T[]) {
    const haveSameLength = expectedList.length === values.length;
    const haveSameElements = () =>
      values.map((_, i) => values[i] === expectedList[i]).reduce((p, c) => p && c, true);
    return {
      pass: haveSameLength && haveSameElements(),
      message: () => `Expected: ${expectedList} \nReceived: ${values}`
    };
  }
});

test('custom assertion (extending)', () => {
  const list = [10, 20, 30];
  expect(list.length).customToBe(3);
  expect(list).isExactly([10, 20, 30]);
});
