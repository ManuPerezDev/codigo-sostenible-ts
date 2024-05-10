import { Chest } from './Chest'
import { Backpack } from './Backpack'
import { ItemBatch } from './ItemBatch'

export class Farmer {
  backpack: Backpack = new Backpack()
  materialChest: Chest = new Chest()
  seedChest: Chest = new Chest()
  foodChest: Chest = new Chest()

  fill(items: ItemBatch[]) {
    this.backpack.fill(items)
  }

  spell() {
    this.materialChest.spell(this.backpack.materials())
    this.materialChest.sort()

    this.seedChest.spell(this.backpack.seeds())
    this.seedChest.sort()

    this.foodChest.spell(this.backpack.food())
    this.foodChest.sort()

    this.backpack.empty()
  }
}
