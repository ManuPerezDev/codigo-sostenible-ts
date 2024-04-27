import {Cell} from "./Cell";
import {nextGeneration} from "./NextGeneration";

describe('GameOfLife test', () => {
  it('cell should die if has not neighbours', () => {
    const cell = Cell.alive()
    const world = [
      [Cell.dead(), Cell.dead(), Cell.dead(), Cell.dead()],
      [Cell.dead(), cell, Cell.dead(), Cell.dead()],
      [Cell.dead(), Cell.dead(), Cell.dead(), Cell.dead()],
      [Cell.dead(), Cell.dead(), Cell.dead(), Cell.dead()]
    ]

    nextGeneration(world)

    expect(cell.isAlive()).toEqual(false)
  });

  it('cell should detect if there are a neighbour to the left', () => {
    const cell = Cell.alive()
    const westNeighbour = Cell.alive();
    const world = [
      [Cell.dead(), Cell.dead(), Cell.dead(), Cell.dead()],
      [westNeighbour, cell, Cell.dead(), Cell.dead()],
      [Cell.dead(), Cell.dead(), Cell.dead(), Cell.dead()],
      [Cell.dead(), Cell.dead(), Cell.dead(), Cell.dead()]
    ]

    nextGeneration(world)

    expect(cell.neighbours).toEqual(1)
  });

  it('cell should detect if there are a neighbour to the east', () => {
    const cell = Cell.alive()
    const eastNeighbour = Cell.alive();
    const world = [
      [Cell.dead(), Cell.dead(), Cell.dead(), Cell.dead()],
      [Cell.dead(), cell, eastNeighbour, Cell.dead()],
      [Cell.dead(), Cell.dead(), Cell.dead(), Cell.dead()],
      [Cell.dead(), Cell.dead(), Cell.dead(), Cell.dead()]
    ]

    nextGeneration(world)

    expect(cell.neighbours).toEqual(1)
  });

  it('cell should detect if there are a neighbour to the north', () => {
    const cell = Cell.alive()
    const northNeighbour = Cell.alive();
    const world = [
      [Cell.dead(), northNeighbour, Cell.dead(), Cell.dead()],
      [Cell.dead(), cell, Cell.dead(), Cell.dead()],
      [Cell.dead(), Cell.dead(), Cell.dead(), Cell.dead()],
      [Cell.dead(), Cell.dead(), Cell.dead(), Cell.dead()]
    ]

    nextGeneration(world)

    expect(cell.neighbours).toEqual(1)
  });

  it('cell should detect if there are a neighbour to the south', () => {
    const cell = Cell.alive()
    const southCell = Cell.alive();
    const world = [
      [Cell.dead(), Cell.dead(), Cell.dead(), Cell.dead()],
      [Cell.dead(), cell, Cell.dead(), Cell.dead()],
      [Cell.dead(), southCell, Cell.dead(), Cell.dead()],
      [Cell.dead(), Cell.dead(), Cell.dead(), Cell.dead()]
    ]

    nextGeneration(world)

    expect(cell.neighbours).toEqual(1)
  });

  it('cell should detect if there are a neighbour to the north-west', () => {
    const cell = Cell.alive()
    const northWestCell = Cell.alive();
    const world = [
      [northWestCell, Cell.dead(), Cell.dead(), Cell.dead()],
      [Cell.dead(), cell, Cell.dead(), Cell.dead()],
      [Cell.dead(), Cell.dead(), Cell.dead(), Cell.dead()],
      [Cell.dead(), Cell.dead(), Cell.dead(), Cell.dead()]
    ]

    nextGeneration(world)

    expect(cell.neighbours).toEqual(1)
  });

  it('cell should detect if there are a neighbour to the north-east', () => {
    const cell = Cell.alive()
    const northEastCell = Cell.alive();
    const world = [
      [Cell.dead(), Cell.dead(), northEastCell, Cell.dead()],
      [Cell.dead(), cell, Cell.dead(), Cell.dead()],
      [Cell.dead(), Cell.dead(), Cell.dead(), Cell.dead()],
      [Cell.dead(), Cell.dead(), Cell.dead(), Cell.dead()]
    ]

    nextGeneration(world)

    expect(cell.neighbours).toEqual(1)
  });

  it('cell should detect if there are a neighbour to the south-west', () => {
    const cell = Cell.alive()
    const southWestCell = Cell.alive();
    const world = [
      [Cell.dead(), Cell.dead(), Cell.dead(), Cell.dead()],
      [Cell.dead(), cell, Cell.dead(), Cell.dead()],
      [southWestCell, Cell.dead(), Cell.dead(), Cell.dead()],
      [Cell.dead(), Cell.dead(), Cell.dead(), Cell.dead()]
    ]

    nextGeneration(world)

    expect(cell.neighbours).toEqual(1)
  });

  it('cell should detect if there are a neighbour to the south-east', () => {
    const cell = Cell.alive()
    const southEastCell = Cell.alive();
    const world = [
      [Cell.dead(), Cell.dead(), Cell.dead(), Cell.dead()],
      [Cell.dead(), cell, Cell.dead(), Cell.dead()],
      [Cell.dead(), Cell.dead(), southEastCell, Cell.dead()],
      [Cell.dead(), Cell.dead(), Cell.dead(), Cell.dead()]
    ]

    nextGeneration(world)

    expect(cell.neighbours).toEqual(1)
  });

  it('cell should live if it has two neighbours', () => {
    const cell = Cell.alive()
    const world = [
      [Cell.dead(), Cell.dead(), Cell.dead(), Cell.dead()],
      [Cell.dead(), Cell.alive(), Cell.dead(), Cell.dead()],
      [Cell.dead(), cell, Cell.alive(), Cell.dead()],
      [Cell.dead(), Cell.dead(), Cell.dead(), Cell.dead()]
    ]

    nextGeneration(world)

    expect(cell.isAlive()).toEqual(true)
  });

  it('cell should live if it has three neighbours', () => {
    const cell = Cell.alive()
    const world = [
      [Cell.dead(), Cell.dead(), Cell.dead(), Cell.dead()],
      [Cell.dead(), Cell.alive(), Cell.dead(), Cell.dead()],
      [Cell.alive(), cell, Cell.alive(), Cell.dead()],
      [Cell.dead(), Cell.dead(), Cell.dead(), Cell.dead()]
    ]

    nextGeneration(world)

    expect(cell.isAlive()).toEqual(true)
  });

  it('cell should die if it has more than three neighbours', () => {
    const cell = Cell.alive();
    const world = [
      [Cell.dead(), Cell.dead(), Cell.dead(), Cell.dead()],
      [Cell.dead(), Cell.alive(), Cell.alive(), Cell.dead()],
      [Cell.alive(), cell, Cell.dead(), Cell.dead()],
      [Cell.dead(), Cell.alive(), Cell.dead(), Cell.dead()]
    ]

    nextGeneration(world)

    expect(cell.isAlive()).toEqual(false)
  });

  it('cell should revive if it has three neighbours', () => {
    const cell = Cell.dead();
    const world = [
      [Cell.dead(), Cell.dead(), Cell.dead(), Cell.dead()],
      [Cell.dead(), Cell.alive(), Cell.dead(), Cell.dead()],
      [Cell.alive(), cell, Cell.alive(), Cell.dead()],
      [Cell.dead(), Cell.dead(), Cell.dead(), Cell.dead()]
    ]

    nextGeneration(world)

    expect(cell.isAlive()).toEqual(true)
  });

  it('cell should not revive if it has more than three neighbours', () => {
    const cell = Cell.dead();
    const world = [
      [Cell.dead(), Cell.dead(), Cell.dead(), Cell.dead()],
      [Cell.dead(), Cell.alive(), Cell.dead(), Cell.dead()],
      [Cell.alive(), cell, Cell.alive(), Cell.dead()],
      [Cell.dead(), Cell.alive(), Cell.dead(), Cell.dead()]
    ]

    nextGeneration(world)

    expect(cell.isAlive()).toEqual(false)
  });
})
