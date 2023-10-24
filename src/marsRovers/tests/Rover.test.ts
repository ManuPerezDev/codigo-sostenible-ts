import {Rover} from "../src/Rover";
import {Land} from "../src/Land";
import {MoveForward} from "../src/MoveForward";
import {MoveBackward} from "../src/MoveBackward";
import {TurnRight} from "../src/TurnRight";
import {TurnLeft} from "../src/TurnLeft";
import {Position} from "../src/Position";
import {North} from "../src/Direction/North";
import {East} from "../src/Direction/East";
import {West} from "../src/Direction/West";

describe('Rover should', () => {
  const initialPosition = new Position(1, 1)
  const initialDirection = new North()

  it('move forward', () => {
    const commands = [new MoveForward()]
    const land = new Land(10, 10)
    const rover = new Rover(land, initialPosition, initialDirection)

    rover.execute(commands)

    expect(rover.getPosition().getX()).toBe(1)
    expect(rover.getPosition().getY()).toBe(2)
    expect(rover.getDirection()).toBeInstanceOf(North)
  });

  it('move backward', () => {
    const commands = [new MoveBackward()]
    const land = new Land(10, 10)
    const rover = new Rover(land, initialPosition, initialDirection)

    rover.execute(commands)

    expect(rover.getPosition().getX()).toBe(1)
    expect(rover.getPosition().getY()).toBe(0)
    expect(rover.getDirection()).toBeInstanceOf(North)
  });

  it('turn right', () => {
    const commands = [new TurnRight()]
    const land = new Land(10, 10)
    const rover = new Rover(land, initialPosition, initialDirection)

    rover.execute(commands)

    expect(rover.getPosition().getX()).toBe(1)
    expect(rover.getPosition().getY()).toBe(1)
    expect(rover.getDirection()).toBeInstanceOf(East)
  });

  it('turn left', () => {
    const commands = [new TurnLeft()]
    const land = new Land(10, 10)
    const rover = new Rover(land, initialPosition, initialDirection)

    rover.execute(commands)

    expect(rover.getPosition().getX()).toBe(1)
    expect(rover.getPosition().getY()).toBe(1)
    expect(rover.getDirection()).toBeInstanceOf(West)
  });

  it('accept multiple commands', () => {
    const commands = [new MoveForward(), new MoveForward(), new TurnRight(), new MoveBackward()]
    const land = new Land(10, 10)
    const rover = new Rover(land, initialPosition, initialDirection)

    rover.execute(commands)

    expect(rover.getPosition().getX()).toBe(0)
    expect(rover.getPosition().getY()).toBe(3)
    expect(rover.getDirection()).toBeInstanceOf(East)
  })
});
