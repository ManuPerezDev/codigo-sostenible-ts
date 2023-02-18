// “” ⇒ ””
// “Foo” ⇒ “Foo”
// “Foo Bar” ⇒ “FooBar”
// “Foo_Bar-Foo” ⇒ “FooBarFoo”
// “foo” ⇒ “Foo”
// “foo_bar foo-bar” ⇒ “FooBarFooBar”

import { camelCaseConverter } from "./camelCaseConverter";

describe('camelCaseConverter should', () => {
  it('not convert a single word or empty text', () => {
    expect(camelCaseConverter('')).toBe('')
    expect(camelCaseConverter('Foo')).toBe('Foo')
  });

  it('join words removing white spaces', () => {
    expect(camelCaseConverter('Foo Bar')).toBe('FooBar')
  });

  it('join words removing hyphen and underscore', () => {
    expect(camelCaseConverter('Foo_Bar-Foo')).toBe('FooBarFoo')
  });

  it('turn first letter to capital', () => {
    expect(camelCaseConverter('foo')).toBe('Foo')
  });

  it('convert to camel case combining all cases', () => {
    expect(camelCaseConverter('foo_bar foo-bar')).toBe('FooBarFooBar')
  });
});
