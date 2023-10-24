import {Command} from "./Command";
import {Rover} from "./Rover";

export class MoveBackward implements Command {
  execute(rover: Rover): void {
    rover.setPosition(rover.getDirection().moveBackward(rover.getPosition()))
  }
}
