import {Command} from "./Command";
import {Rover} from "./Rover";

export class TurnRight implements Command {
  execute(rover: Rover): void {
    rover.setDirection(rover.getDirection().turnRight())
  }
}
