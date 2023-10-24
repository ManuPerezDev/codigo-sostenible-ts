import {Land} from "../src/Land";
import {Rover} from "../src/Rover";
import {TurnLeft} from "../src/TurnLeft";
import {Position} from "../src/Position";
import {North} from "../src/Direction/North";
import {South} from "../src/Direction/South";
import {West} from "../src/Direction/West";
import {East} from "../src/Direction/East";

describe('TurnLeft test', () => {
  const initialPosition = new Position(1, 1)
  it('should turn left when the rover is facing north', () => {
    const land = new Land(10, 10)
    const rover = new Rover(land, initialPosition, new North())

    new TurnLeft().execute(rover)

    expect(rover.getDirection()).toBeInstanceOf(West)
  });

  it('should turn left when the rover is facing south', () => {
    const land = new Land(10, 10)
    const rover = new Rover(land, initialPosition, new South())

    new TurnLeft().execute(rover)

    expect(rover.getDirection()).toBeInstanceOf(East)
  });
  it('should turn left when the rover is facing west', () => {
    const land = new Land(10, 10)
    const rover = new Rover(land, initialPosition, new West())

    new TurnLeft().execute(rover)

    expect(rover.getDirection()).toBeInstanceOf(South)
  });
  it('should turn left when the rover is facing east', () => {
    const land = new Land(10, 10)
    const rover = new Rover(land, initialPosition, new East())

    new TurnLeft().execute(rover)

    expect(rover.getDirection()).toBeInstanceOf(North)
  });
});
