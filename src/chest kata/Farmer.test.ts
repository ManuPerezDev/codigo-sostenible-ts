import { Farmer } from './Farmer'
import { ItemLot } from './ItemLot'

describe('Farmer', () => {
  describe('Spell', () => {
    it('should sort chests when they are empty', () => {
      const items: ItemLot[] = [
        new ItemLot('wood', 5),
        new ItemLot('wood', 2),
        new ItemLot('stone', 3),
        new ItemLot('mushroom', 1),
        new ItemLot('wheat seed', 4),
        new ItemLot('potato seed', 2),
        new ItemLot('trout', 1),
        new ItemLot('cooper ore', 3),
      ]
      const sortedMaterials: ItemLot[] = [
        new ItemLot('cooper ore', 3),
        new ItemLot('stone', 3),
        new ItemLot('wood', 5),
        new ItemLot('wood', 2),
      ]
      const sortedSeeds: ItemLot[] = [new ItemLot('potato seed', 2), new ItemLot('wheat seed', 4)]
      const sortedFood: ItemLot[] = [new ItemLot('mushroom', 1), new ItemLot('trout', 1)]
      const farmer = new Farmer()
      farmer.fill(items)
      farmer.spell()

      expect(farmer.materialChest.items).toStrictEqual(sortedMaterials)
      expect(farmer.seedChest.items).toStrictEqual(sortedSeeds)
      expect(farmer.foodChest.items).toStrictEqual(sortedFood)
    })

    it('should empty the backpack after sorting', () => {
      const items: ItemLot[] = [
        new ItemLot('wood', 5),
        new ItemLot('wood', 2),
        new ItemLot('stone', 3),
        new ItemLot('mushroom', 1),
        new ItemLot('wheat seed', 4),
        new ItemLot('potato seed', 2),
        new ItemLot('trout', 1),
        new ItemLot('cooper ore', 3),
      ]
      const farmer = new Farmer()
      farmer.fill(items)
      farmer.spell()

      expect(farmer.backpack.items).toStrictEqual([])
    })

    it('should discards items that do not fit in chests', () => {
      const farmer = new Farmer()
      const items1: ItemLot[] = [
        new ItemLot('wood', 5),
        new ItemLot('wood', 5),
        new ItemLot('wood', 5),
        new ItemLot('wood', 2),
        new ItemLot('stone', 5),
        new ItemLot('stone', 5),
        new ItemLot('stone', 5),
        new ItemLot('stone', 3),
      ]

      farmer.fill(items1)
      farmer.spell()

      const items2: ItemLot[] = [
        new ItemLot('wood', 5),
        new ItemLot('wood', 5),
        new ItemLot('wood', 5),
        new ItemLot('stone', 5),
        new ItemLot('stone', 5),
        new ItemLot('stone', 5),
        new ItemLot('stone', 4),
        new ItemLot('coal', 2),
      ]

      farmer.fill(items2)
      farmer.spell()

      const items3: ItemLot[] = [
        new ItemLot('wood', 5),
        new ItemLot('wood', 5),
        new ItemLot('wood', 5),
        new ItemLot('wood', 5),
        new ItemLot('coal', 5),
        new ItemLot('coal', 5),
        new ItemLot('coal', 5),
        new ItemLot('cooper ore', 5),
      ]

      farmer.fill(items3)
      farmer.spell()

      const sortedMaterials: ItemLot[] = [
        new ItemLot('coal', 5),
        new ItemLot('stone', 5),
        new ItemLot('stone', 5),
        new ItemLot('stone', 5),
        new ItemLot('stone', 5),
        new ItemLot('stone', 5),
        new ItemLot('stone', 5),
        new ItemLot('stone', 5),
        new ItemLot('stone', 2),
        new ItemLot('wood', 5),
        new ItemLot('wood', 5),
        new ItemLot('wood', 5),
        new ItemLot('wood', 5),
        new ItemLot('wood', 5),
        new ItemLot('wood', 5),
        new ItemLot('wood', 5),
      ]

      expect(farmer.materialChest.items).toStrictEqual(sortedMaterials)
    })
  })
})
