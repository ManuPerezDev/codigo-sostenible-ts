// Cases
// - If the developer is Pedro, he grabs three maxibons.
// - If the developer is Fran, he grabs one maxibon.
// - If the developer is Davide, he does not grab any maxibon.
// - If the developer is Sergio, he grabs two maxibons.
// - If the developer is Jorge, he grabs one maxibon.
// - If there are 2 maxibons or less the system will send the message:
// "Hi guys, I'm <NAME OF THE DEVELOPER>. We need more maxibons!" and the frigde is refilled
// - We should start every week with 10 maxibons.
// - If the developers wants to get more maxibons that are available, only gets available ones.

import fc from "fast-check";

class Fridge {
  private currentMaxibons: number;
  private readonly maximumFridgeCapacity = 10
  private readonly minimumAllowedMaxibons = 2;

  constructor() {
    this.currentMaxibons = this.maximumFridgeCapacity
  }


  takeMaxibon(devs: Developer[]) {
    devs.forEach((dev) => {
      this.currentMaxibons = this.currentMaxibons - dev.maxibonsToTake

      if (this.hasExceedMinimumAllowed()) {
        this.refillMaxibons();
      }
    })
  }

  private hasExceedMinimumAllowed() {
    return this.currentMaxibons <= this.minimumAllowedMaxibons;
  }

  private refillMaxibons() {
    this.currentMaxibons = this.maximumFridgeCapacity
  }

  remainingMaxibons() {
    return this.currentMaxibons
  }
}

class Developer {
  constructor(private name: string, readonly maxibonsToTake: number) { }
}

describe('Fridge should', () => {
  const maximumFridgeCapacity = 10;
  const developers = [
    new Developer('Pedro', 3),
    new Developer('David', 0),
    new Developer('Alberto', 1),
    new Developer('Jorge', 2),
    new Developer('Sergio', 1)
  ]

  it('fridge must be filled with maxibons',  () => {
    fc.assert(
      fc.property(fc.constantFrom(...developers), (dev) => {
        const fridge = new Fridge()

        fridge.takeMaxibon([dev])

        expect(fridge.remainingMaxibons()).toBeGreaterThan(0)
      })
    )
  });

  it('if some developer takes maxibons the fridge should have less than 10', () => {
    fc.assert(
      fc.property(fc.constantFrom(...developers), (dev) => {
        const fridge = new Fridge()

        fridge.takeMaxibon([dev])

        expect(fridge.remainingMaxibons()).toEqual(maximumFridgeCapacity - dev.maxibonsToTake)
      })
    )
  });

  it('if a group of developers take maxibons the remaining maxibons should greater than 2', () => {
    fc.assert(
      fc.property(fc.array(fc.constantFrom(...developers)), (devs) => {
        const fridge = new Fridge()

        fridge.takeMaxibon(devs)

        expect(fridge.remainingMaxibons()).toBeGreaterThan(2)
      })
    )
  });
});
