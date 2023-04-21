import {Template} from "../src/Template";
import {TemplateMarkedTextError} from "../src/TemplateMarkedTextError";

describe('Template should', () => {
  it('raise error when template is empty ',  () => {
    expect(() => Template.createValidTemplate('')).toThrowError(TemplateMarkedTextError)
  });
});
