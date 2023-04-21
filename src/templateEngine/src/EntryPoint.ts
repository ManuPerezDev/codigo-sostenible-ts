import { Template } from "./Template";
import { Dictionary } from "./Dictionary";
import { TemplateEngine } from "./TemplateEngine";
import { MissingDictionaryKeyError } from "./MissingDictionaryKeyError";
import { TemplateMarkedTextError } from "./TemplateMarkedTextError";
import { NoDictionaryProvidedError } from "./NoDictionaryProvidedError";

export class EntryPoint {
  static run(rawTemplate: string, rawDictionary: { [key: string]: string }) {
    try {
      const template = Template.createValidTemplate(rawTemplate);
      const dictionary = Dictionary.createValidDictionary(rawDictionary);
      const result = TemplateEngine.fill(template, dictionary);
      console.log('----- RESULT -----');
      console.log(result);
    } catch (error) {
      if(error instanceof MissingDictionaryKeyError) {
        console.error('Handling MissingDictionaryKeyError');
        return;
      }
      if (error instanceof TemplateMarkedTextError) {
        console.error('Handling TemplateMarkedTextError');
        return;
      }
      if(error instanceof NoDictionaryProvidedError) {
        console.error('Handling NoDictionaryProvidedError');
        return;
      }

      console.error('Handling error');
    }
  }
}

const template = 'Hello ${name}';
const dictionary = { name: 'John'};
EntryPoint.run(template, dictionary);
