import { ItemLot } from './ItemLot'

export class Backpack {
  items: ItemLot[] = []
  private backpackCapacity = 8

  fill(items: ItemLot[]) {
    for (let i = 0; i < items.length; i++) {
      if (this.items.length < this.backpackCapacity) {
        this.items.push(items[i])
      }
    }
  }

  materials() {
    return this.items.filter((item) => ['wood', 'stone', 'coal', 'cooper ore'].includes(item.name))
  }

  seeds() {
    return this.items.filter((item) =>
      ['wheat seed', 'potato seed', 'carrot seed', 'corn seed', 'kale seed'].includes(item.name)
    )
  }

  food() {
    return this.items.filter((item) => ['raspberry', 'apricot', 'wild onion', 'mushroom', 'trout'].includes(item.name))
  }

  empty() {
    this.items = []
  }
}
