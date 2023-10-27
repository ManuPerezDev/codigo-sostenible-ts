import {West} from "./West";
import {Direction} from "./Direction";
import {East} from "./East";
import {Position} from "../Position";

export class South implements Direction {
  turnLeft() {
    return new East();
  }

  turnRight() {
    return new West();
  }

  moveForward(position: Position): Position {
    return new Position(position.getX(), position.getY() - 1)
  }

  moveBackward(position: Position): Position {
    return new Position(position.getX(), position.getY() + 1)
  }
}
