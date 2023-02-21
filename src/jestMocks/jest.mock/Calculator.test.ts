import * as arithmetic from "../Arithmetic";
import * as calculator from "../Calculator";

jest.mock("../../src/core/arithmetic");

describe('The calculator', () => {
  it("calls arithmetic.add", () => {
    calculator.doAdd(1, 2);
    expect(arithmetic.add).toHaveBeenCalledWith(1, 2);
  });

  it("calls arithmetic.subtract", () => {
    calculator.doSubtract(1, 2);
    expect(arithmetic.subtract).toHaveBeenCalledWith(1, 2);
  });
});
