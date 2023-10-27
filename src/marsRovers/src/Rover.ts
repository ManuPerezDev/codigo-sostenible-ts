import {Land} from "./Land";
import {Command} from "./Command";
import {Position} from "./Position";
import {Direction} from "./Direction/Direction";

export class Rover {
  constructor(private land: Land, private position: Position, private direction: Direction) {
  }

  execute(commands: Command[]): void {
    commands.forEach(command => {
      if (command.isMoveForward()) {
        this.moveForward()
        return
      }
      if (command.isMoveBackward()) {
        this.moveBackward()
        return
      }
      if (command.isTurnRight()) {
        this.turnRight()
        return
      }
      if (command.isTurnLeft()) {
        this.turnLeft()
        return
      }
    })
  }

  private moveForward() {
    this.position = this.getDirection().moveForward(this.getPosition())
  }

  private moveBackward() {
    this.position = this.getDirection().moveBackward(this.getPosition())
  }

  private turnRight() {
    this.direction = this.getDirection().turnRight()
  }

  private turnLeft() {
    this.direction = this.getDirection().turnLeft()
  }

  getPosition() {
    return this.position
  }

  getDirection() {
    return this.direction
  }
}
