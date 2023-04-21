/**
 * x1 - ('This is a template with one ${variable}', {}) => throw NoDictionaryProvidedError
 * x2 - ('This is a template with one', {variable: 'hola'}) => throw TemplateMarkedTextError
 * x3 - ('This is a template with one ${variable}', {variable: 'hola'}) => 'This is a template with one hola'
 * x4 - ('This is a template with one ${variable} and another ${other-variable}', {variable: 'hola', 'other-variable': 'adios'}) => 'This is a template with one hola and another adios'
 * x5 - ('This is a template with one ${variable} and another ${other-variable}', {variable: 'hola'}) => throw MissingDictionaryKeyError
 * x6 - ('This is a template with one ${variable} and the same variable ${variable}', {variable: 'hola'}) => 'This is a template with one hola and the same variable hola'
 * x7 - ('This is a template with one ${variable} and another ${other-variable}', {variable: 'hola', 'not-coincidence-variable': 'adios'}) => throw MissingDictionaryKeyError
 */
import { TemplateEngine } from "../src/TemplateEngine";
import { MissingDictionaryKeyError } from "../src/MissingDictionaryKeyError";
import {Template} from "../src/Template";
import {Dictionary} from "../src/Dictionary";

describe('TemplateEngine should', () => {
  it('fill an marked text ',  () => {
    const dictionary = Dictionary.createValidDictionary({ variable: 'hola' })
    const template = Template.createValidTemplate('This is a template with one ${variable}')
    expect(TemplateEngine.fill(template, dictionary)).toBe('This is a template with one hola')
  });

  it('fill multiple marked text ',  () => {
    const dictionary = Dictionary.createValidDictionary({ variable: 'hola', 'other-variable': 'adios' })
    const template = Template.createValidTemplate('This is a template with one ${variable} and another ${other-variable}')
    expect(TemplateEngine.fill(template, dictionary)).toBe('This is a template with one hola and another adios')
  });

  it('fill many marked text with the same variable',  () => {
    const dictionary = Dictionary.createValidDictionary({ variable: 'hola' })
    const template = Template.createValidTemplate('This is a template with one ${variable} and another ${variable}')
    expect(TemplateEngine.fill(template, dictionary)).toBe('This is a template with one hola and another hola')
  });

  it('raise an error when a marked text has not variable in dictionary',  () => {
    const dictionary = Dictionary.createValidDictionary({ variable: 'hola' })
    const template = Template.createValidTemplate('This is a template with one ${variable} and another ${other-variable}')
    expect(() => TemplateEngine.fill(template, dictionary)).toThrowError(MissingDictionaryKeyError)
  });

  it('raise an error when a marked text has not variable in dictionary',  () => {
    const dictionary = Dictionary.createValidDictionary({ variable: 'hola', 'not-coincide-variable': 'adios' })
    const template = Template.createValidTemplate('This is a template with one ${variable} and another ${other-variable}')
    expect(() => TemplateEngine.fill(template, dictionary)).toThrowError(MissingDictionaryKeyError)
  });
});
