import {Command} from "./Command";

export class MoveForward implements Command {
  execute(rover) {
    rover.setPosition(rover.getDirection().moveForward(rover.getPosition()))
  }
}
