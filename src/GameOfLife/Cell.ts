export class Cell {
  private alive: boolean
  neighbours: number

  private constructor(alive: boolean) {
    this.alive = alive
    this.neighbours = 0
  }

  static alive() {
    return new Cell(true)
  }

  static dead() {
    return new Cell(false)
  }

  dies() {
    this.alive = false
  }

  revives() {
    this.alive = true
  }

  isDead() {
    return !this.alive
  }

  isAlive() {
    return this.alive
  }

  addNeighbour() {
    this.neighbours += 1
  }
}
