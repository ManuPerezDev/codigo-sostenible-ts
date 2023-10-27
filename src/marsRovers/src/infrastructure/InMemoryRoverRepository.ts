import {Rover} from "../domain/Rover";

export class InMemoryRoverRepository {
  private rover: Rover | null;

  constructor() {
    this.rover = null;
  }

  save(rover) {
    this.rover = rover;
  }

  load() {
    return this.rover;
  }
}
