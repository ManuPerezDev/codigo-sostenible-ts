export type Item = {
  name: string
  quantity: number
}

export class Farmer {
  backpack: Item[] = []
  materialChest: Item[] = []
  seedChest: Item[] = []
  foodChest: Item[] = []

  fill(items: Item[]) {
    const backpackCapacity = 8
    for (let i = 0; i < items.length; i++) {
      if (this.backpack.length < backpackCapacity) {
        this.backpack.push(items[i])
      }
    }
  }

  spell() {
    const chestCapacity = 16
    const maxLotSize = 5
    this.backpack.forEach((item: Item) => {
      switch (item.name) {
        case 'wood':
        case 'stone':
        case 'coal':
        case 'cooper ore':
        case 'iron ore':
          const materials = this.materialChest.filter(
            (chestItem) => chestItem.name === item.name
          )
          if (
            materials.length === 0 &&
            this.materialChest.length < chestCapacity
          ) {
            this.materialChest.push(item)
          } else {
            for (let i = 0; i < materials.length; i++) {
              if (materials[i].quantity < maxLotSize) {
                while (
                  item.quantity !== 0 &&
                  materials[i].quantity < maxLotSize
                ) {
                  materials[i].quantity++
                  item.quantity--
                }
              }
            }
            if (
              item.quantity !== 0 &&
              this.materialChest.length < chestCapacity
            ) {
              this.materialChest.push(item)
            }
          }
          break
        case 'wheat seed':
        case 'potato seed':
        case 'carrot seed':
        case 'corn seed':
        case 'kale seed':
          const seeds = this.seedChest.filter(
            (chestItem) => chestItem.name === item.name
          )
          if (seeds.length === 0 && this.seedChest.length < chestCapacity) {
            this.seedChest.push(item)
          } else {
            for (let i = 0; i < seeds.length; i++) {
              if (seeds[i].quantity < maxLotSize) {
                while (item.quantity !== 0 && seeds[i].quantity < maxLotSize) {
                  seeds[i].quantity++
                  item.quantity--
                }
              }
            }
            if (item.quantity !== 0 && this.seedChest.length < chestCapacity) {
              this.seedChest.push(item)
            }
          }
          break
        case 'raspberry':
        case 'apricot':
        case 'wild onion':
        case 'mushroom':
        case 'trout':
          const food = this.foodChest.filter(
            (chestItem) => chestItem.name === item.name
          )
          if (food.length === 0 && this.foodChest.length < chestCapacity) {
            this.foodChest.push(item)
          } else {
            for (let i = 0; i < food.length; i++) {
              if (food[i].quantity < maxLotSize) {
                while (item.quantity !== 0 && food[i].quantity < maxLotSize) {
                  food[i].quantity++
                  item.quantity--
                }
              }
            }
            if (item.quantity !== 0 && this.foodChest.length < chestCapacity) {
              this.foodChest.push(item)
            }
          }
          break
        default:
          break
      }
    })

    this.materialChest.sort((a, b) => a.name.localeCompare(b.name))
    this.seedChest.sort((a, b) => a.name.localeCompare(b.name))
    this.foodChest.sort((a, b) => a.name.localeCompare(b.name))

    this.backpack = []
  }
}
