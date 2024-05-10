import { Chest } from './Chest'
import { Backpack } from './Backpack'
import { ItemLot } from './ItemLot'

export class Farmer {
  backpack: Backpack = new Backpack()
  materialChest: Chest = new Chest()
  seedChest: Chest = new Chest()
  foodChest: Chest = new Chest()

  fill(items: ItemLot[]) {
    this.backpack.fill(items)
  }

  spell() {
    for (const item of this.backpack.materials()) {
      this.materialChest.put(item)
    }
    this.materialChest.sort()

    for (const item of this.backpack.seeds()) {
      this.seedChest.put(item)
    }
    this.seedChest.sort()

    for (const item of this.backpack.food()) {
      this.foodChest.put(item)
    }
    this.foodChest.sort()

    this.backpack.empty()
  }
}
