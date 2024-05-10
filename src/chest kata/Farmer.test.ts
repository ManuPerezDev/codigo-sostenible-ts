import { Farmer, Item } from './Farmer'

describe('Farmer', () => {
  describe('Spell', () => {
    it('should sort chests when they are empty', () => {
      const items: Item[] = [
        { name: 'wood', quantity: 5 },
        { name: 'wood', quantity: 2 },
        { name: 'stone', quantity: 3 },
        { name: 'mushroom', quantity: 1 },
        { name: 'wheat seed', quantity: 4 },
        { name: 'potato seed', quantity: 2 },
        { name: 'trout', quantity: 1 },
        { name: 'cooper ore', quantity: 3 },
      ]
      const sortedMaterials: Item[] = [
        { name: 'cooper ore', quantity: 3 },
        { name: 'stone', quantity: 3 },
        { name: 'wood', quantity: 5 },
        { name: 'wood', quantity: 2 },
      ]
      const sortedSeeds: Item[] = [
        { name: 'potato seed', quantity: 2 },
        { name: 'wheat seed', quantity: 4 },
      ]

      const sortedFood: Item[] = [
        { name: 'mushroom', quantity: 1 },
        { name: 'trout', quantity: 1 },
      ]
      const farmer = new Farmer()
      farmer.fill(items)
      farmer.spell()

      expect(farmer.materialChest).toStrictEqual(sortedMaterials)
      expect(farmer.seedChest).toStrictEqual(sortedSeeds)
      expect(farmer.foodChest).toStrictEqual(sortedFood)
    })

    it('should empty the backpack after sorting', () => {
      const items: Item[] = [
        { name: 'wood', quantity: 5 },
        { name: 'wood', quantity: 2 },
        { name: 'stone', quantity: 3 },
        { name: 'mushroom', quantity: 1 },
        { name: 'wheat seed', quantity: 4 },
        { name: 'potato seed', quantity: 2 },
        { name: 'trout', quantity: 1 },
        { name: 'cooper ore', quantity: 3 },
      ]
      const farmer = new Farmer()
      farmer.fill(items)
      farmer.spell()

      expect(farmer.backpack).toStrictEqual([])
    })

    it('should discards items that do not fit in chests', () => {
      const farmer = new Farmer()
      const items1: Item[] = [
        { name: 'wood', quantity: 5 },
        { name: 'wood', quantity: 5 },
        { name: 'wood', quantity: 5 },
        { name: 'wood', quantity: 2 },
        { name: 'stone', quantity: 5 },
        { name: 'stone', quantity: 5 },
        { name: 'stone', quantity: 5 },
        { name: 'stone', quantity: 3 },
      ]

      farmer.fill(items1)
      farmer.spell()

      const items2: Item[] = [
        { name: 'wood', quantity: 5 },
        { name: 'wood', quantity: 5 },
        { name: 'wood', quantity: 5 },
        { name: 'stone', quantity: 5 },
        { name: 'stone', quantity: 5 },
        { name: 'stone', quantity: 5 },
        { name: 'stone', quantity: 4 },
        { name: 'coal', quantity: 2 },
      ]

      farmer.fill(items2)
      farmer.spell()

      const items3: Item[] = [
        { name: 'wood', quantity: 5 },
        { name: 'wood', quantity: 5 },
        { name: 'wood', quantity: 5 },
        { name: 'wood', quantity: 5 },
        { name: 'coal', quantity: 5 },
        { name: 'coal', quantity: 5 },
        { name: 'coal', quantity: 5 },
        { name: 'cooper ore', quantity: 5 },
      ]

      farmer.fill(items3)
      farmer.spell()

      const sortedMaterials: Item[] = [
        { name: 'coal', quantity: 5 },
        { name: 'stone', quantity: 5 },
        { name: 'stone', quantity: 5 },
        { name: 'stone', quantity: 5 },
        { name: 'stone', quantity: 5 },
        { name: 'stone', quantity: 5 },
        { name: 'stone', quantity: 5 },
        { name: 'stone', quantity: 5 },
        { name: 'stone', quantity: 2 },
        { name: 'wood', quantity: 5 },
        { name: 'wood', quantity: 5 },
        { name: 'wood', quantity: 5 },
        { name: 'wood', quantity: 5 },
        { name: 'wood', quantity: 5 },
        { name: 'wood', quantity: 5 },
        { name: 'wood', quantity: 5 },
      ]

      expect(farmer.materialChest).toStrictEqual(sortedMaterials)
    })
  })
})
