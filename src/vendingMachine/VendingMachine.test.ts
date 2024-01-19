class VendingMachine {
  private currentAmount: number;
  private message: string;

  constructor() {
    this.currentAmount = 0;
    this.message = 'INSERT COIN';
  }

  insertCoin(coin: number) {
    if (this.isAcceptedCoin(coin)) {
      this.currentAmount += coin;
    }
    this.setDisplayAmountMessage();
  }

  selectProduct(productNumber: number) {
    const productPrices = {
      1: 100,
      2: 50,
      3: 65
    }
    const selectedProductPrice = productPrices[productNumber];

    if (this.currentAmount < selectedProductPrice) {
      this.message = `Price ${selectedProductPrice}`;
    } else {
      this.currentAmount = this.currentAmount - selectedProductPrice;
      this.message = 'THANK YOU';
    }
  }

  displayMessage() {
    const messageToDisplay = this.message;
    this.setDisplayAmountMessage()
    return messageToDisplay;
  }

  private setDisplayAmountMessage() {
    if (this.currentAmount === 0) {
      this.message = 'INSERT COIN';
    } else {
      this.message = this.currentAmount.toString();
    }
  }

  private isAcceptedCoin(coin: number) {
    const acceptedCoins = [5, 10, 25];
    return acceptedCoins.includes(coin);
  }
}

describe('VendingMachine', () => {
  it('should add coin to the machine', () => {
    const vendingMachine = new VendingMachine();

    vendingMachine.insertCoin(5);

    expect(vendingMachine.displayMessage()).toBe('5');
  });

  it('should add multiple coins to the machine', () => {
    const vendingMachine = new VendingMachine();

    vendingMachine.insertCoin(5);
    vendingMachine.insertCoin(5);

    expect(vendingMachine.displayMessage()).toBe('10');
  });

  it('should display info message when no coins are inserted', () => {
    const vendingMachine = new VendingMachine();

    expect(vendingMachine.displayMessage()).toBe('INSERT COIN');
  });

  it('should not accept pennies', () => {
    const vendingMachine = new VendingMachine();

    vendingMachine.insertCoin(1);

    expect(vendingMachine.displayMessage()).toBe('INSERT COIN');
  });

  it.each([
    [1, 'INSERT COIN'],
    [3, 'INSERT COIN'],
    [5, '5'],
    [7, 'INSERT COIN'],
    [10, '10'],
    [15, 'INSERT COIN'],
    [25, '25'],
    [Math.round(((Math.random() * 100) + 26)), 'INSERT COIN'],
  ])('should accept only accept nickels, dimes and quarters', (coin, expectedDisplay) => {
    const vendingMachine = new VendingMachine();

    vendingMachine.insertCoin(coin);

    expect(vendingMachine.displayMessage()).toBe(expectedDisplay);
  });

  it('should display a gratitude message when selecting a product having enough money inserted', () => {
    const vendingMachine = new VendingMachine();

    vendingMachine.insertCoin(25);
    vendingMachine.insertCoin(25);
    vendingMachine.insertCoin(25);
    vendingMachine.insertCoin(25);
    vendingMachine.selectProduct(1);

    expect(vendingMachine.displayMessage()).toBe('THANK YOU');
  })

  it('should display the product price when selecting a product not having enough money inserted', () => {
    const vendingMachine = new VendingMachine();

    vendingMachine.insertCoin(25);
    vendingMachine.insertCoin(25);
    vendingMachine.selectProduct(1);

    expect(vendingMachine.displayMessage()).toBe('Price 100');
  })

  it('should display a gratitude message when selecting product 2 having enough money inserted', () => {
    const vendingMachine = new VendingMachine();

    vendingMachine.insertCoin(25);
    vendingMachine.insertCoin(25);
    vendingMachine.selectProduct(2);

    expect(vendingMachine.displayMessage()).toBe('THANK YOU');
  })

  it('should display the product price when selecting the product 2 has not enough money inserted', () => {
    const vendingMachine = new VendingMachine();

    vendingMachine.insertCoin(25);
    vendingMachine.selectProduct(2);

    expect(vendingMachine.displayMessage()).toBe('Price 50');
  })

  it('should display a gratitude message when selecting product 3 having enough money inserted', () => {
    const vendingMachine = new VendingMachine();

    vendingMachine.insertCoin(25);
    vendingMachine.insertCoin(25);
    vendingMachine.insertCoin(10);
    vendingMachine.insertCoin(5);
    vendingMachine.selectProduct(3);

    expect(vendingMachine.displayMessage()).toBe('THANK YOU');
  })

  it('should display the product price when selecting the product 3 has not enough money inserted', () => {
    const vendingMachine = new VendingMachine();

    vendingMachine.insertCoin(25);
    vendingMachine.insertCoin(25);
    vendingMachine.selectProduct(3);

    expect(vendingMachine.displayMessage()).toBe('Price 65');
  })

  it('should display the current amount after the item price is displayed', () => {
    const vendingMachine = new VendingMachine();

    vendingMachine.insertCoin(25);
    vendingMachine.selectProduct(2);

    expect(vendingMachine.displayMessage()).toBe('Price 50');
    expect(vendingMachine.displayMessage()).toBe('25');
  })

  it('should display the current amount after the item price is displayed', () => {
    const vendingMachine = new VendingMachine();

    vendingMachine.selectProduct(2);

    expect(vendingMachine.displayMessage()).toBe('Price 50');
    expect(vendingMachine.displayMessage()).toBe('INSERT COIN');
  })
})
