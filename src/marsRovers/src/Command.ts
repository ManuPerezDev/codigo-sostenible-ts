import {Rover} from "./Rover";

export interface Command {
  execute(rover: Rover): void;
}
