import { ItemBatch } from './ItemBatch'

export class Chest {
  itemBatches: ItemBatch[] = []
  private chestCapacity = 16

  spell(backpackItemBatches: ItemBatch[]) {
    for (const backpackItemBatch of backpackItemBatches) {
      const itemBatchesFromBackpack = this.filterItemsOfType(backpackItemBatch)

      if (this.thereIsSpace()) {
        this.itemBatches.push(backpackItemBatch)
      }

      for (const itemBatch of itemBatchesFromBackpack) {
        if (itemBatch.isNotEmpty() && itemBatch.isNotFull()) {
          itemBatch.addItem()
          backpackItemBatch.removeItem()
        }
      }
    }
    this.sortItems()
  }

  private thereIsSpace(): boolean {
    return this.itemBatches.length < this.chestCapacity
  }

  private sortItems() {
    this.itemBatches.sort((a, b) => a.name.localeCompare(b.name))
  }

  private filterItemsOfType(itemBatch: ItemBatch): ItemBatch[] {
    return this.itemBatches.filter((chestBatch) => chestBatch.equals(itemBatch))
  }
}
