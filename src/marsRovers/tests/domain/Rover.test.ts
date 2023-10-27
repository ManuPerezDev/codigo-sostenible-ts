import {Rover} from "../../src/domain/Rover";
import {Land} from "../../src/domain/Land";
import {Position} from "../../src/domain/Position";
import {North} from "../../src/domain/Direction/North";
import {East} from "../../src/domain/Direction/East";
import {West} from "../../src/domain/Direction/West";

describe('Rover should', () => {
  const initialPosition = new Position(1, 1)
  const initialDirection = new North()

  it('move forward', () => {
    const land = new Land(10, 10)
    const rover = new Rover(land, initialPosition, initialDirection)

    rover.moveForward()

    expect(rover.getPosition().getX()).toBe(1)
    expect(rover.getPosition().getY()).toBe(2)
    expect(rover.getDirection()).toBeInstanceOf(North)
  });

  it('move backward', () => {
    const land = new Land(10, 10)
    const rover = new Rover(land, initialPosition, initialDirection)

    rover.moveBackward()

    expect(rover.getPosition().getX()).toBe(1)
    expect(rover.getPosition().getY()).toBe(0)
    expect(rover.getDirection()).toBeInstanceOf(North)
  });

  it('turn right', () => {
    const land = new Land(10, 10)
    const rover = new Rover(land, initialPosition, initialDirection)

    rover.turnRight()

    expect(rover.getPosition().getX()).toBe(1)
    expect(rover.getPosition().getY()).toBe(1)
    expect(rover.getDirection()).toBeInstanceOf(East)
  });

  it('turn left', () => {
    const land = new Land(10, 10)
    const rover = new Rover(land, initialPosition, initialDirection)

    rover.turnLeft()

    expect(rover.getPosition().getX()).toBe(1)
    expect(rover.getPosition().getY()).toBe(1)
    expect(rover.getDirection()).toBeInstanceOf(West)
  });
});
