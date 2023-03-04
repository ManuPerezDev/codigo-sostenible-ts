import {AgedBrie, BackstagePasses, GildedRose, Item, RegularItem, Sulfuras} from "./GildedRose";

describe('Gilded Rose', () => {
  it('should Sulfuras, Hand of Ragnaros', () => {
    const name = 'Sulfuras, Hand of Ragnaros';
    const sellIn = 50;
    const quality = 51;
    const gildedRose = new GildedRose([
      new Sulfuras({ name, sellIn, quality })
    ]);

    const items = gildedRose.updateQuality();

    expect(items[0].name).toBe(name);
    expect(items[0].sellIn).toBe(50);
    expect(items[0].quality).toBe(51);
  });

  it('should Backstage passes to a TAFKAL80ETC concert with sellIn 0', () => {
    const name = 'Backstage passes to a TAFKAL80ETC concert';
    const sellIn = 0;
    const quality = 51;
    const gildedRose = new GildedRose([
      new BackstagePasses({ name, sellIn, quality })
    ]);

    const items = gildedRose.updateQuality();

    expect(items[0].name).toBe(name);
    expect(items[0].sellIn).toBe(-1);
    expect(items[0].quality).toBe(0);
  });

  it('should Backstage passes to a TAFKAL80ETC concert', () => {
    const name = 'Backstage passes to a TAFKAL80ETC concert';
    const sellIn = 50;
    const quality = 51;
    const gildedRose = new GildedRose([
      new BackstagePasses({ name, sellIn, quality })
    ]);

    const items = gildedRose.updateQuality();

    expect(items[0].name).toBe(name);
    expect(items[0].sellIn).toBe(49);
    expect(items[0].quality).toBe(51);
  });

  it('should Backstage passes to a TAFKAL80ETC concert quality minor than 50 and sellIn minor than 11', () => {
    const name = 'Backstage passes to a TAFKAL80ETC concert';
    const sellIn = 10;
    const quality = 49;
    const gildedRose = new GildedRose([
      new BackstagePasses({ name, sellIn, quality })
    ]);

    const items = gildedRose.updateQuality();

    expect(items[0].name).toBe(name);
    expect(items[0].sellIn).toBe(9);
    expect(items[0].quality).toBe(50);
  });

  it('should Backstage passes to a TAFKAL80ETC concert quality minor than 50 and sellIn minor than 6', () => {
    const name = 'Backstage passes to a TAFKAL80ETC concert';
    const sellIn = 5;
    const quality = 49;
    const gildedRose = new GildedRose([
      new BackstagePasses({ name, sellIn, quality })
    ]);

    const items = gildedRose.updateQuality();

    expect(items[0].name).toBe(name);
    expect(items[0].sellIn).toBe(4);
    expect(items[0].quality).toBe(50);
  });

  it('should Aged Brie', () => {
    const name = 'Aged Brie';
    const sellIn = 50;
    const quality = 51;
    const gildedRose = new GildedRose([
      new AgedBrie({ name, sellIn, quality })
    ]);

    const items = gildedRose.updateQuality();

    expect(items[0].name).toBe(name);
    expect(items[0].sellIn).toBe(49);
    expect(items[0].quality).toBe(51);
  });

  it('should Aged Brie quality minor than 50', () => {
    const name = 'Aged Brie';
    const sellIn = 50;
    const quality = 49;
    const gildedRose = new GildedRose([
      new AgedBrie({ name, sellIn, quality })
    ]);

    const items = gildedRose.updateQuality();

    expect(items[0].name).toBe(name);
    expect(items[0].sellIn).toBe(49);
    expect(items[0].quality).toBe(50);
  });

  it('should Aged Brie quality minor than 50 and sellIn equals to 0', () => {
    const name = 'Aged Brie';
    const sellIn = 0;
    const quality = 49;
    const gildedRose = new GildedRose([
      new AgedBrie({ name, sellIn, quality })
    ]);

    const items = gildedRose.updateQuality();

    expect(items[0].name).toBe(name);
    expect(items[0].sellIn).toBe(-1);
    expect(items[0].quality).toBe(50);
  });

  it('should Ball', () => {
    const name = 'ball';
    const sellIn = 1;
    const quality = 1;
    const gildedRose = new GildedRose([
      new RegularItem({ name, sellIn, quality })
    ]);

    const items = gildedRose.updateQuality();

    expect(items[0].name).toBe(name);
    expect(items[0].sellIn).toBe(0);
    expect(items[0].quality).toBe(0);
  });
});
