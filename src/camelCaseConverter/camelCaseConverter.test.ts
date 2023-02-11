// “” ⇒ ””
// “Foo” ⇒ “Foo”
// “Foo Bar” ⇒ “FooBar”
// “Foo_Bar-Foo” ⇒ “FooBarFoo”
// “foo” ⇒ “Foo”
// “foo_bar foo-bar” ⇒ “FooBarFooBar”

import {camelCaseConverter} from "./camelCaseConverter";

describe('camelCaseConverter should', () => {
  it('return same string', () => {
    expect(camelCaseConverter('')).toBe('')
    expect(camelCaseConverter('Foo')).toBe('Foo')
  });

  it('remove white spaces', () => {
    expect(camelCaseConverter('Foo Bar')).toBe('FooBar')
  });

  it('remove hyphen and underscore', () => {
    expect(camelCaseConverter('Foo_Bar-Foo')).toBe('FooBarFoo')
  });

  it('turn first letter to capital', () => {
    expect(camelCaseConverter('foo')).toBe('Foo')
  });

  it('return camel case with all cases', () => {
    expect(camelCaseConverter('foo_bar foo-bar')).toBe('FooBarFooBar')
  });
});
