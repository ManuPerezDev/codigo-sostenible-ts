import { ItemBatch } from './ItemBatch'

export class Chest {
  itemBatches: ItemBatch[] = []
  private chestCapacity = 16

  put(backpackItemBatch: ItemBatch) {
    const itemBatchesFromBackpack = this.filterItemsOfType(backpackItemBatch)

    if (backpackItemBatch.isNotEmpty() && this.thereIsSpace()) {
      this.itemBatches.push(backpackItemBatch)
    }

    for (const itemBatch of itemBatchesFromBackpack) {
      if (itemBatch.isNotFull()) {
        for (let j = 0; backpackItemBatch.isNotEmpty() && itemBatch.isNotFull(); j++) {
          itemBatch.add()
          backpackItemBatch.remove()
        }
      }
    }
  }

  private thereIsSpace(): boolean {
    return this.itemBatches.length < this.chestCapacity
  }

  sort() {
    this.itemBatches.sort((a, b) => a.name.localeCompare(b.name))
  }

  private filterItemsOfType(itemBatch: ItemBatch): ItemBatch[] {
    return this.itemBatches.filter((chestBatch) => chestBatch.equals(itemBatch))
  }
}
