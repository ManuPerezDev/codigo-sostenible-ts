import { NoDictionaryProvidedError } from "./NoDictionaryProvidedError";
import { TemplateMarkedTextError } from "./TemplateMarkedTextError";
import { MissingDictionaryKeyError } from "./MissingDictionaryKeyError";

export class TemplateEngine {
  static fill(template: string, dictionary: { [key: string]: string }) {
    if (this.isDictionaryInvalid(dictionary)) {
      throw new NoDictionaryProvidedError()
    }

    if (this.isTemplateNotValid(template)) {
      throw new TemplateMarkedTextError()
    }

    let filledTemplate = template
    for (const key in dictionary) {
      filledTemplate = filledTemplate.replaceAll('${' + key + '}', dictionary[key])
    }

    if (this.thereAreRemainingMarkedText(filledTemplate)) {
      throw new MissingDictionaryKeyError()
    }

    return filledTemplate
  }

  private static thereAreRemainingMarkedText(filledTemplate: string) {
    return filledTemplate.match(/\${.*}/g);
  }

  private static isTemplateNotValid(template: string) {
    return !template.match(/\${.*}/g);
  }

  private static isDictionaryInvalid(dictionary: { [p: string]: string }) {
    return Object.keys(dictionary).length === 0;
  }
}
