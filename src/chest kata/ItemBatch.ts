export class ItemBatch {
  name: string
  private quantity: number
  private maxBatchSize = 5

  constructor(name: string, quantity: number) {
    this.name = name
    this.quantity = quantity
  }

  equals(itemLot: ItemBatch): boolean {
    return this.name === itemLot.name
  }

  isNotFull(): boolean {
    return this.quantity < this.maxBatchSize
  }

  isNotEmpty(): boolean {
    return this.quantity !== 0
  }

  add() {
    this.quantity++
  }

  remove() {
    this.quantity--
  }
}
