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
    this.seedChest.spell(this.backpack.seeds())
    this.foodChest.spell(this.backpack.food())
    this.backpack.empty()
  }
}
