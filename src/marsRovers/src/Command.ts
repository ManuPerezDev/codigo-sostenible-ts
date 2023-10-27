export abstract class Command {
  isMoveForward(): boolean {
    return false
  }

  isMoveBackward(): boolean {
    return false
  }

  isTurnRight(): boolean {
    return false
  }

  isTurnLeft(): boolean {
    return false
  }
}
