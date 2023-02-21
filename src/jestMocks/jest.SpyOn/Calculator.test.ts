import * as arithmetic from "../Arithmetic";
import * as calculator from "../Calculator";

describe('The calculator', () => {
  it("calls arithmetic add", () => {
    const mockedAdd = jest.spyOn(arithmetic, 'add');
    mockedAdd.mockImplementation(() => 10);
    expect(calculator.doAdd(1, 2)).toBe(3);
    expect(mockedAdd).toHaveBeenCalledWith(1, 2);
  });

  it("calls arithmetic subtract", () => {
    const mockedSubtract = jest.spyOn(arithmetic, 'subtract');
    expect(calculator.doAdd(1, 2)).toBe(-1);
    expect(mockedSubtract).toHaveBeenCalledWith(1, 2);
  });
});
