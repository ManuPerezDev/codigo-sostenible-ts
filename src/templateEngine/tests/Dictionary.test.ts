import {NoDictionaryProvidedError} from "../src/NoDictionaryProvidedError";
import {Dictionary} from "../src/Dictionary";

describe('Dictionary should', () => {
  it('raise error when dictionary is empty ',  () => {
    expect(() => Dictionary.createValidDictionary({})).toThrowError(NoDictionaryProvidedError)
  });
});
