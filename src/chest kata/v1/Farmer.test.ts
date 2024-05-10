import { Farmer } from './Farmer'
import { ItemBatch } from './ItemBatch'

describe('Farmer', () => {
  describe('Spell', () => {
    it('should sort chests when they are empty', () => {
      const items: ItemBatch[] = [
        new ItemBatch('wood', 5),
        new ItemBatch('wood', 2),
        new ItemBatch('stone', 3),
        new ItemBatch('mushroom', 1),
        new ItemBatch('wheat seed', 4),
        new ItemBatch('potato seed', 2),
        new ItemBatch('trout', 1),
        new ItemBatch('cooper ore', 3),
      ]
      const sortedMaterials: ItemBatch[] = [
        new ItemBatch('cooper ore', 3),
        new ItemBatch('stone', 3),
        new ItemBatch('wood', 5),
        new ItemBatch('wood', 2),
      ]
      const sortedSeeds: ItemBatch[] = [new ItemBatch('potato seed', 2), new ItemBatch('wheat seed', 4)]
      const sortedFood: ItemBatch[] = [new ItemBatch('mushroom', 1), new ItemBatch('trout', 1)]
      const farmer = new Farmer()
      farmer.fill(items)
      farmer.spell()

      expect(farmer.materialChest.itemBatches).toStrictEqual(sortedMaterials)
      expect(farmer.seedChest.itemBatches).toStrictEqual(sortedSeeds)
      expect(farmer.foodChest.itemBatches).toStrictEqual(sortedFood)
    })

    it('should empty the backpack after sorting', () => {
      const items: ItemBatch[] = [
        new ItemBatch('wood', 5),
        new ItemBatch('wood', 2),
        new ItemBatch('stone', 3),
        new ItemBatch('mushroom', 1),
        new ItemBatch('wheat seed', 4),
        new ItemBatch('potato seed', 2),
        new ItemBatch('trout', 1),
        new ItemBatch('cooper ore', 3),
      ]
      const farmer = new Farmer()
      farmer.fill(items)
      farmer.spell()

      expect(farmer.backpack.items).toStrictEqual([])
    })

    it('should discards items that do not fit in chests', () => {
      const farmer = new Farmer()
      const items1: ItemBatch[] = [
        new ItemBatch('wood', 5),
        new ItemBatch('wood', 5),
        new ItemBatch('wood', 5),
        new ItemBatch('wood', 2),
        new ItemBatch('stone', 5),
        new ItemBatch('stone', 5),
        new ItemBatch('stone', 5),
        new ItemBatch('stone', 3),
      ]

      farmer.fill(items1)
      farmer.spell()

      const items2: ItemBatch[] = [
        new ItemBatch('wood', 5),
        new ItemBatch('wood', 5),
        new ItemBatch('wood', 5),
        new ItemBatch('stone', 5),
        new ItemBatch('stone', 5),
        new ItemBatch('stone', 5),
        new ItemBatch('stone', 4),
        new ItemBatch('coal', 2),
      ]

      farmer.fill(items2)
      farmer.spell()

      const items3: ItemBatch[] = [
        new ItemBatch('wood', 5),
        new ItemBatch('wood', 5),
        new ItemBatch('wood', 5),
        new ItemBatch('wood', 5),
        new ItemBatch('coal', 5),
        new ItemBatch('coal', 5),
        new ItemBatch('coal', 5),
        new ItemBatch('cooper ore', 5),
      ]

      farmer.fill(items3)
      farmer.spell()

      const sortedMaterials: ItemBatch[] = [
        new ItemBatch('coal', 5),
        new ItemBatch('stone', 5),
        new ItemBatch('stone', 5),
        new ItemBatch('stone', 5),
        new ItemBatch('stone', 5),
        new ItemBatch('stone', 5),
        new ItemBatch('stone', 5),
        new ItemBatch('stone', 5),
        new ItemBatch('stone', 2),
        new ItemBatch('wood', 5),
        new ItemBatch('wood', 5),
        new ItemBatch('wood', 5),
        new ItemBatch('wood', 5),
        new ItemBatch('wood', 5),
        new ItemBatch('wood', 5),
        new ItemBatch('wood', 5),
      ]

      expect(farmer.materialChest.itemBatches).toStrictEqual(sortedMaterials)
    })
  })
})
