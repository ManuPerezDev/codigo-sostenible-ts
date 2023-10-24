import {Command} from "./Command";
import {Rover} from "./Rover";

export class TurnLeft implements Command {
  execute(rover: Rover): void {
    rover.setDirection(rover.getDirection().turnLeft())
  }
}
