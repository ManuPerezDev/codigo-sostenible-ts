import {Position} from "../Position";

export interface Direction {
  turnLeft(): Direction;

  turnRight(): Direction;

  moveForward(position: Position): Position;

  moveBackward(position: Position): Position;
}
