import {North} from "../../../src/domain/Direction/North";
import {West} from "../../../src/domain/Direction/West";
import {East} from "../../../src/domain/Direction/East";

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
