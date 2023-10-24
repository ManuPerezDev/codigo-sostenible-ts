import {Land} from "../src/Land";
import {Rover} from "../src/Rover";
import {MoveBackward} from "../src/MoveBackward";
import {Position} from "../src/Position";
import {East} from "../src/Direction/East";
import {West} from "../src/Direction/West";
import {South} from "../src/Direction/South";
import {North} from "../src/Direction/North";

describe('MoveBackward test', () => {
  const initialPosition = new Position(1, 1)
  it('should move if direction is north', () => {
    const commands = new MoveBackward()
    const land = new Land(10, 10)
    const rover = new Rover(land, initialPosition, new North())

    commands.execute(rover)

    expect(rover.getPosition().getX()).toBe(1)
    expect(rover.getPosition().getY()).toBe(0)
    expect(rover.getDirection()).toBeInstanceOf(North)
  });

  it('should move if direction is south', () => {
    const commands = new MoveBackward()
    const land = new Land(10, 10)
    const rover = new Rover(land, initialPosition, new South())

    commands.execute(rover)

    expect(rover.getPosition().getX()).toBe(1)
    expect(rover.getPosition().getY()).toBe(2)
    expect(rover.getDirection()).toBeInstanceOf(South)
  });

  it('should move if direction is west', () => {
    const commands = new MoveBackward()
    const land = new Land(10, 10)
    const rover = new Rover(land, initialPosition, new West())

    commands.execute(rover)

    expect(rover.getPosition().getX()).toBe(2)
    expect(rover.getPosition().getY()).toBe(1)
    expect(rover.getDirection()).toBeInstanceOf(West)
  });

  it('should move if direction is east', () => {
    const commands = new MoveBackward()
    const land = new Land(10, 10)
    const rover = new Rover(land, initialPosition, new East())

    commands.execute(rover)

    expect(rover.getPosition().getX()).toBe(0)
    expect(rover.getPosition().getY()).toBe(1)
    expect(rover.getDirection()).toBeInstanceOf(East)
  });
});
