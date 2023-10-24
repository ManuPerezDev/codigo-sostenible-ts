import {North} from "../../src/Direction/North";
import {West} from "../../src/Direction/West";
import {East} from "../../src/Direction/East";

describe('North test', () => {
  it('should turn left', () => {
    const north = new North();
    const west = north.turnLeft();
    expect(west).toBeInstanceOf(West);
  });
  it('should turn right', () => {
    const north = new North();
    const east = north.turnRight();
    expect(east).toBeInstanceOf(East);
  });
});
