import {Cell} from "./Cell";

export function nextGeneration(world: Cell[][]) {
  calculateNeighbours(world);

  decidesWhoLivesAndWhoDies(world);
}

function calculateNeighbours(world: Cell[][]) {
  for (const [y, row] of world.entries()) {
    for (const [x, cell] of row.entries()) {
      const westNeighbour = world[y][x - 1]
      const eastNeighbour = world[y][x + 1]
      const northNeighbour = world[y - 1] && world[y - 1][x]
      const northWestNeighbour = world[y - 1] && world[y - 1][x - 1]
      const northEastNeighbour = world[y - 1] && world[y - 1][x + 1]
      const southNeighbour = world[y + 1] && world[y + 1][x]
      const southWestNeighbour = world[y + 1] && world[y + 1][x - 1]
      const southEastNeighbour = world[y + 1] && world[y + 1][x + 1]

      if (westNeighbour && westNeighbour.isAlive()) {
        cell.addNeighbour()
      }
      if (eastNeighbour && eastNeighbour.isAlive()) {
        cell.addNeighbour()
      }
      if (northNeighbour && northNeighbour.isAlive()) {
        cell.addNeighbour()
      }
      if (northWestNeighbour && northWestNeighbour.isAlive()) {
        cell.addNeighbour()
      }
      if (northEastNeighbour && northEastNeighbour.isAlive()) {
        cell.addNeighbour()
      }
      if (southNeighbour && southNeighbour.isAlive()) {
        cell.addNeighbour()
      }
      if (southWestNeighbour && southWestNeighbour.isAlive()) {
        cell.addNeighbour()
      }
      if (southEastNeighbour && southEastNeighbour.isAlive()) {
        cell.addNeighbour()
      }
    }
  }
}

function decidesWhoLivesAndWhoDies(world: Cell[][]) {
  for (const row of world) {
    for (const cell of row) {
      if (cell.isAlive()) {
        if (cell.neighbours < 2) {
          cell.dies()
        }
        if (cell.neighbours >= 2) {
          cell.revives()
        }
        if (cell.neighbours > 3) {
          cell.dies()
        }
      }
      if (cell.isDead()) {
        if (cell.neighbours === 3) {
          cell.revives()
        }
      }
    }
  }
}
