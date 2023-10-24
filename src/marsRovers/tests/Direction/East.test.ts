import {East} from "../../src/Direction/East";
import {North} from "../../src/Direction/North";
import {South} from "../../src/Direction/South";

describe('East test', () => {
  it('should turn left', () => {
    const east = new East();
    const north = east.turnLeft();
    expect(north).toBeInstanceOf(North);
  });
  it('should turn right', () => {
    const east = new East();
    const south = east.turnRight();
    expect(south).toBeInstanceOf(South);
  });
});
