import { TemplateMarkedTextError } from "./TemplateMarkedTextError";

export class Template {
  private constructor(readonly value: string) {}
  static createValidTemplate(rawTemplate: string) {
    if (Template.isNotValid(rawTemplate)) {
      throw new TemplateMarkedTextError()
    }
    return new Template(rawTemplate)
  }

  private static isNotValid(template: string) {
    return !template.match(/\${.*}/g);
  }
}
