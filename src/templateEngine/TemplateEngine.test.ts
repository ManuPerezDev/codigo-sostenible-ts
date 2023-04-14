/**
 * x1 - ('This is a template with one ${variable}', {}) => throw NoDictionaryProvidedError
 * x2 - ('This is a template with one', {variable: 'hola'}) => throw TemplateMarkedTextError
 * x3 - ('This is a template with one ${variable}', {variable: 'hola'}) => 'This is a template with one hola'
 * x4 - ('This is a template with one ${variable} and another ${other-variable}', {variable: 'hola', 'other-variable': 'adios'}) => 'This is a template with one hola and another adios'
 * x5 - ('This is a template with one ${variable} and another ${other-variable}', {variable: 'hola'}) => throw MissingDictionaryKeyError
 * x6 - ('This is a template with one ${variable} and the same variable ${variable}', {variable: 'hola'}) => 'This is a template with one hola and the same variable hola'
 * x7 - ('This is a template with one ${variable} and another ${other-variable}', {variable: 'hola', 'not-coincidence-variable': 'adios'}) => throw MissingDictionaryKeyError
 */

class Template {
  static fill(template: string, dictionary: {[key: string]: string}) {
    if (this.isDictionaryInvalid(dictionary)) {
      throw new NoDictionaryProvidedError()
    }

    if (this.isTemplateNotValid(template)) {
      throw new TemplateMarkedTextError()
    }

    let filledTemplate = template
    for(const key in dictionary) {
      filledTemplate = filledTemplate.replaceAll('${' + key + '}', dictionary[key])
    }

    if(this.thereAreRemainingMarkedText(filledTemplate)) {
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

class NoDictionaryProvidedError extends Error {
  constructor() {
    super();
  }
}

class TemplateMarkedTextError extends Error {
  constructor() {
    super();
  }
}

class MissingDictionaryKeyError extends Error {
  constructor() {
    super();
  }
}

describe('TemplateEngine should', () => {
  it('fill an marked text ',  () => {
    const dictionary = { variable: 'hola' }
    const template = 'This is a template with one ${variable}'
    expect(Template.fill(template, dictionary)).toBe('This is a template with one hola')
  });

  it('fill multiple marked text ',  () => {
    const dictionary = { variable: 'hola', 'other-variable': 'adios' }
    const template = 'This is a template with one ${variable} and another ${other-variable}'
    expect(Template.fill(template, dictionary)).toBe('This is a template with one hola and another adios')
  });

  it('fill many marked text with the same variable',  () => {
    const dictionary = { variable: 'hola' }
    const template = 'This is a template with one ${variable} and another ${variable}'
    expect(Template.fill(template, dictionary)).toBe('This is a template with one hola and another hola')
  });

  it('raise error when dictionary is empty ',  () => {
    const dictionary = {}
    const template = 'This is a template with one ${variable}'
    expect(() => Template.fill(template, dictionary)).toThrowError(NoDictionaryProvidedError)
  });

  it('raise error when template has not marked text ',  () => {
    const dictionary = { variable: 'hola' }
    const template = 'This is a template with one'
    expect(() => Template.fill(template, dictionary)).toThrowError(TemplateMarkedTextError)
  });

  it('raise an error when a marked text has not variable in dictionary',  () => {
    const dictionary = { variable: 'hola' }
    const template = 'This is a template with one ${variable} and another ${other-variable}'
    expect(() => Template.fill(template, dictionary)).toThrowError(MissingDictionaryKeyError)
  });

  it('raise an error when a marked text has not variable in dictionary',  () => {
    const dictionary = { variable: 'hola', 'not-coincide-variable': 'adios' }
    const template = 'This is a template with one ${variable} and another ${other-variable}'
    expect(() => Template.fill(template, dictionary)).toThrowError(MissingDictionaryKeyError)
  });
});
