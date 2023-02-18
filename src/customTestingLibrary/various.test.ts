import { expectThatList } from "./testLib";

describe('various should', () => {
  test('custom assertions (grouping)', () => {
    const list = [10, 20, 30];

    expectThatList(list).isExactly(10, 20, 30);
  });
});
