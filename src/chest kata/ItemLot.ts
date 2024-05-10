export class ItemLot {
  name: string
  quantity: number

  constructor(name: string, quantity: number) {
    this.name = name
    this.quantity = quantity
  }

  equals(itemLot: ItemLot): boolean {
    return this.name === itemLot.name
  }

  isEmpty(): boolean {
    return this.quantity === 0
  }
}
