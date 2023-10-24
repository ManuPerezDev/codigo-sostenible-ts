import {South} from "./South";
import {North} from "./North";
import {Direction} from "./Direction";
import {Position} from "../Position";

export class East implements Direction {
  turnLeft() {
    return new North();
  }

  turnRight() {
    return new South();
  }

  moveForward(position: Position): Position {
    return new Position(position.getX() + 1, position.getY())
  }

  moveBackward(position: Position): Position {
    return new Position(position.getX() - 1, position.getY())
  }
}
