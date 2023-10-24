import {Land} from "./Land";
import {Command} from "./Command";
import {Position} from "./Position";
import {Direction} from "./Direction/Direction";

export class Rover {
  constructor(private land: Land, private position: Position, private direction: Direction) {
  }

  execute(commands: Command[]): void {
    commands.forEach(command => command.execute(this))
  }

  getPosition() {
    return this.position
  }

  setPosition(position: Position) {
    this.position = position

  }

  getDirection() {
    return this.direction
  }

  setDirection(direction: Direction) {
    this.direction = direction
  }
}
