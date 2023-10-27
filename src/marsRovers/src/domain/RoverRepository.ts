import {Rover} from "./Rover";

export interface RoverRepository {
  save(rover: Rover): void

  load(): Rover
}
