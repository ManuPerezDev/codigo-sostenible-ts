import {Direction} from "./Direction";
import {North} from "./North";
import {South} from "./South";
import {Position} from "../Position";

export class West implements Direction {
  turnLeft() {
    return new South();
  }

  turnRight() {
    return new North();
  }

  moveForward(position: Position): Position {
    return new Position(position.getX() - 1, position.getY())
  }

  moveBackward(position: Position): Position {
    return new Position(position.getX() + 1, position.getY())
  }
}
