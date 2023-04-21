import { MissingDictionaryKeyError } from "./MissingDictionaryKeyError";
import { Template } from "./Template";
import { Dictionary } from "./Dictionary";

export class TemplateEngine {
  static fill(rawTemplate: string, rawDictionary: { [key: string]: string }) {
    const template = Template.createValidTemplate(rawTemplate)
    const dictionary = Dictionary.createValidDictionary(rawDictionary)

    let filledTemplate = this.fillTemplate(template, dictionary);

    if (this.thereAreRemainingMarkedText(filledTemplate)) {
      throw new MissingDictionaryKeyError()
    }

    return filledTemplate
  }

  private static fillTemplate(template: Template, dictionary: Dictionary) {
    let filledTemplate = template.value
    for (const key in dictionary.value) {
      filledTemplate = filledTemplate.replaceAll('${' + key + '}', dictionary.getValue(key))
    }
    return filledTemplate;
  }

  private static thereAreRemainingMarkedText(filledTemplate: string) {
    return filledTemplate.match(/\${.*}/g);
  }
}
