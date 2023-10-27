import {Land} from "./Land";
import {Position} from "./Position";
import {Direction} from "./Direction/Direction";

export class Rover {
  constructor(private land: Land, private position: Position, private direction: Direction) {
  }

  moveForward() {
    this.position = this.getDirection().moveForward(this.getPosition())
  }

  moveBackward() {
    this.position = this.getDirection().moveBackward(this.getPosition())
  }

  turnRight() {
    this.direction = this.getDirection().turnRight()
  }

  turnLeft() {
    this.direction = this.getDirection().turnLeft()
  }

  getPosition() {
    return this.position
  }

  getDirection() {
    return this.direction
  }
}
