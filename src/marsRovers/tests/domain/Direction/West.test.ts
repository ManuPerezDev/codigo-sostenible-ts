import {North} from "../../../src/domain/Direction/North";
import {West} from "../../../src/domain/Direction/West";
import {South} from "../../../src/domain/Direction/South";

describe('West test', () => {
  it('should turn left', () => {
    const west = new West();
    const south = west.turnLeft();
    expect(south).toBeInstanceOf(South);
  });
  it('should turn right', () => {
    const west = new West();
    const north = west.turnRight();
    expect(north).toBeInstanceOf(North);
  });
});
