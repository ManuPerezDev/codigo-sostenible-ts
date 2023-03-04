export abstract class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(params: { name: string, sellIn: number, quality: number }) {
    this.name = params.name;
    this.sellIn = params.sellIn;
    this.quality = params.quality;
  }

  abstract updateQuality();
}

export class RegularItem extends Item {
  updateQuality() {
    this.sellIn = this.sellIn - 1;

    if (this.quality > 0) {
      this.quality = this.quality - 1
    }
  }
}

export class AgedBrie extends Item {
  updateQuality() {
    this.sellIn = this.sellIn - 1;

    if (this.quality < 50) {
      this.quality = this.quality + 1
    }
  }
}

export class BackstagePasses extends Item {
  updateQuality() {
    this.sellIn = this.sellIn - 1;

    if (this.quality < 50) {
      if (this.sellIn < 11) {
        this.quality = this.quality + 1
      } else if (this.sellIn < 6) {
        this.quality = this.quality + 1
        if (this.sellIn < 0 && this.quality > 0) {
          this.quality = this.quality - 1
        }
      }
    }
    if (this.sellIn < 0 && this.quality > 0) {
      this.quality = this.quality - this.quality
    }
  }
}

export class Sulfuras extends Item {
  updateQuality() {
    return this.quality
  }
}

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  updateQuality() {
    this.items.forEach(item => item.updateQuality());
    return this.items;
  }
}
