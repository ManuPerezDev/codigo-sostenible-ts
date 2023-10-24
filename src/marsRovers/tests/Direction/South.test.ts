import {South} from "../../src/Direction/South";
import {West} from "../../src/Direction/West";
import {East} from "../../src/Direction/East";

describe('South test', () => {
  it('should turn left', () => {
    const south = new South();
    const east = south.turnLeft();
    expect(east).toBeInstanceOf(East);
  });
  it('should turn right', () => {
    const south = new South();
    const west = south.turnRight();
    expect(west).toBeInstanceOf(West);
  });
});
