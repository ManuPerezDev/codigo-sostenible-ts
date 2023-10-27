import {Command} from "./domain/Command";
import {MoveForward} from "./domain/MoveForward";
import {InMemoryRoverRepository} from "./infrastructure/InMemoryRoverRepository";
import {Rover} from "./domain/Rover";
import {North} from "./domain/Direction/North";
import {Position} from "./domain/Position";
import {Land} from "./domain/Land";

function run() {
  const roverRepository = new InMemoryRoverRepository()
  const land = new Land(10, 10)
  const initialPosition = new Position(1, 1)
  const initialDirection = new North()
  const rover = new Rover(land, initialPosition, initialDirection)

  const commands: Command[] = [
    new MoveForward(),
    new MoveForward(),
  ]

  commands.forEach(command => {
    if (command.isMoveForward()) {
      rover.moveForward()
    } else if (command.isMoveBackward()) {
      rover.moveBackward()
    } else if (command.isTurnRight()) {
      rover.turnRight()
    } else if (command.isTurnLeft()) {
      rover.turnLeft()
    }
    roverRepository.save(rover)
  })

  console.log(roverRepository.load().getPosition())
}

run()
