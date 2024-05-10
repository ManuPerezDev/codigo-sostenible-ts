export type Item = {
  name: string
  quantity: number
}

export class Farmer {
  backpack: Item[] = []
  chest1: Item[] = [] // materials
  chest2: Item[] = [] // seeds
  chest3: Item[] = [] // food

  fill(items: Item[]) {
    // fill the backpack with the items passed as argument until the backpack is full (16 items)
    for (let i = 0; i < items.length; i++) {
      if (this.backpack.length < 16) {
        this.backpack.push(items[i])
      }
    }
  }

  spell() {
    // loop through the bag and store the objects in the correct chest
    this.backpack.forEach((item: Item) => {
      switch (item.name) {
        //materials
        case 'wood':
        case 'stone':
        case 'coal':
        case 'cooper ore':
        case 'iron ore':
          const items1 = this.chest1.filter(
            (chestItem) => chestItem.name === item.name
          )
          // if not exist any item with the same name, add the item to the chest
          if (items1.length === 0 && this.chest1.length < 16) {
            this.chest1.push(item)
            // if the item is already in the chest, check if the quantity is less than 5
          } else {
            for (let i = 0; i < items1.length; i++) {
              if (items1[i].quantity < 5) {
                //increment the quantity of the item in the chest while the quantity of the item in the chest is less
                //than 5 and decrease the quantity of the item in the bag
                while (item.quantity !== 0 && items1[i].quantity < 5) {
                  items1[i].quantity++
                  item.quantity--
                }
              }
            }
            //if the quantity of the item in the bag is not 0, add the item to the chest if it fit
            if (item.quantity !== 0 && this.chest1.length < 16) {
              this.chest1.push(item)
            }
          }
          break
        //seeds
        case 'wheat seed':
        case 'potato seed':
        case 'carrot seed':
        case 'corn seed':
        case 'kale seed':
          const items2 = this.chest2.filter(
            (chestItem) => chestItem.name === item.name
          )
          // if not exist any item with the same name, add the item to the chest
          if (items2.length === 0 && this.chest2.length < 16) {
            this.chest2.push(item)
            // if the item is already in the chest, check if the quantity is less than 5
          } else {
            for (let i = 0; i < items2.length; i++) {
              if (items2[i].quantity < 5) {
                //increment the quantity of the item in the chest while the quantity of the item in the chest is less
                //than 5 and decrease the quantity of the item in the bag
                while (item.quantity !== 0 && items2[i].quantity < 5) {
                  items2[i].quantity++
                  item.quantity--
                }
              }
            }
            //if the quantity of the item in the bag is not 0, add the item to the chest if it fit
            if (item.quantity !== 0 && this.chest2.length < 16) {
              this.chest2.push(item)
            }
          }
          break
        //food
        case 'raspberry':
        case 'apricot':
        case 'wild onion':
        case 'mushroom':
        case 'trout':
          const items3 = this.chest3.filter(
            (chestItem) => chestItem.name === item.name
          )
          // if not exist any item with the same name, add the item to the chest
          if (items3.length === 0 && this.chest3.length < 16) {
            this.chest3.push(item)
            // if the item is already in the chest, check if the quantity is less than 5
          } else {
            for (let i = 0; i < items3.length; i++) {
              if (items3[i].quantity < 5) {
                //increment the quantity of the item in the chest while the quantity of the item in the chest is less
                //than 5 and decrease the quantity of the item in the bag
                while (item.quantity !== 0 && items3[i].quantity < 5) {
                  items3[i].quantity++
                  item.quantity--
                }
              }
            }
            //if the quantity of the item in the bag is not 0, add the item to the chest if it fit
            if (item.quantity !== 0 && this.chest3.length < 16) {
              this.chest3.push(item)
            }
          }
          break
        default:
          // if the object not in the list, do nothing
          break
      }
    })

    //sort the items in the chest by name (ascending) and quantity (descending)
    this.chest1.sort((a, b) => a.name.localeCompare(b.name))
    this.chest2.sort((a, b) => a.name.localeCompare(b.name))
    this.chest3.sort((a, b) => a.name.localeCompare(b.name))

    //empty the backpack
    this.backpack = []
  }
}
