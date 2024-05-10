import { ItemLot } from './ItemLot'

export class Chest {
  items: ItemLot[] = []
  private chestCapacity = 16
  private maxLotSize = 5

  put(backpackItemLot: ItemLot) {
    const itemsLot = this.filterItemsOfType(backpackItemLot)
    if (itemsLot.length === 0 && this.items.length < this.chestCapacity) {
      this.items.push(backpackItemLot)
    } else {
      for (let i = 0; i < itemsLot.length; i++) {
        if (itemsLot[i].quantity < this.maxLotSize) {
          while (backpackItemLot.quantity !== 0 && itemsLot[i].quantity < this.maxLotSize) {
            itemsLot[i].quantity++
            backpackItemLot.quantity--
          }
        }
      }
      if (backpackItemLot.quantity !== 0 && this.items.length < this.chestCapacity) {
        this.items.push(backpackItemLot)
      }
    }
  }

  sort() {
    this.items.sort((a, b) => a.name.localeCompare(b.name))
  }

  private filterItemsOfType(itemLot: ItemLot): ItemLot[] {
    return this.items.filter((chestItem) => chestItem.equals(itemLot))
  }
}
