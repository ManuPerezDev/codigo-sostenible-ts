import {Land} from "../src/Land";
import {Rover} from "../src/Rover";
import {TurnRight} from "../src/TurnRight";
import {Position} from "../src/Position";
import {North} from "../src/Direction/North";
import {East} from "../src/Direction/East";
import {South} from "../src/Direction/South";
import {West} from "../src/Direction/West";

describe('TurnRight test', () => {
  const initialPosition = new Position(1, 1)
  it('should turn right when the rover is facing north', () => {
    const land = new Land(10, 10)
    const rover = new Rover(land, initialPosition, new North())

    new TurnRight().execute(rover)

    expect(rover.getDirection()).toBeInstanceOf(East)
  });

  it('should turn right when the rover is facing south', () => {
    const land = new Land(10, 10)
    const rover = new Rover(land, initialPosition, new South())

    new TurnRight().execute(rover)

    expect(rover.getDirection()).toBeInstanceOf(West)
  });
  it('should turn right when the rover is facing west', () => {
    const land = new Land(10, 10)
    const rover = new Rover(land, initialPosition, new West())

    new TurnRight().execute(rover)

    expect(rover.getDirection()).toBeInstanceOf(North)
  });
  it('should turn right when the rover is facing east', () => {
    const land = new Land(10, 10)
    const rover = new Rover(land, initialPosition, new East())

    new TurnRight().execute(rover)

    expect(rover.getDirection()).toBeInstanceOf(South)
  });
});
