import { NoDictionaryProvidedError } from "./NoDictionaryProvidedError";
import { MissingDictionaryKeyError } from "./MissingDictionaryKeyError";

export class Dictionary {
  private constructor(readonly value: { [key: string]: string }) {}
  static createValidDictionary(rawDictionary: { [key: string]: string }) {
    if (Dictionary.isDictionaryInvalid(rawDictionary)) {
      throw new NoDictionaryProvidedError()
    }
    return new Dictionary(rawDictionary)
  }

  private static isDictionaryInvalid(dictionary: { [p: string]: string }) {
    return Object.keys(dictionary).length === 0;
  }

  getValue(key: string) {
    if (this.isMissingKey(key)) {
      throw new MissingDictionaryKeyError()
    }
    return this.value[key]
  }

  private isMissingKey(key: string) {
    return !this.value[key]
  }
}
