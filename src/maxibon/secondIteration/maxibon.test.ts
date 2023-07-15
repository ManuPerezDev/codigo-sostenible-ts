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
  constructor(private maxibons: number) {}

  takeMaxibon(number: number) {
    this.maxibons -= number
    if(this.maxibons <= 2){
      this.maxibons = 10
    }
  }

  remainingMaxibons() {
    return this.maxibons
  }
}

class Developer {
  constructor(private name: string, private numberOfMaxibons: number) { }

  takeMaxibon(fridge: Fridge) {
    fridge.takeMaxibon(this.numberOfMaxibons)
  }
}

describe('Fridge', () => {
  it('should have always greater or equal to 0 maxibons',  () => {
    fc.assert(
      fc.property(fc.integer(), (num) => {
        const fridge = new Fridge(10)
        const developer = new Developer('Pedro', num)

        developer.takeMaxibon(fridge)

        expect(fridge.remainingMaxibons()).toBeGreaterThan(0)
      })
    )
  });

  describe('Fridge', () => {
    it('should allow to take maxibons', () => {
      const fridge = new Fridge(10)

      fridge.takeMaxibon(2)

      expect(fridge.remainingMaxibons()).toBe(8)
    })

    it('should refill the fridge when the number of maxibons is less or equal to 2', () => {
      const fridge = new Fridge(10)

      fridge.takeMaxibon(8)

      expect(fridge.remainingMaxibons()).toBe(10)
    })

    it('should allow to take only the maximum number of available maxibons', () => {
      const fridge = new Fridge(10)

      fridge.takeMaxibon(20)

      expect(fridge.remainingMaxibons()).toBe(10)
    })
  });

  describe('Developer', () => {
    it('should take maxibons from fridge', () => {
      const developer = new Developer('Pedro', 3)
      const fridge = new Fridge(10)

      developer.takeMaxibon(fridge)

      expect(fridge.remainingMaxibons()).toBe(7)
    })
  });
});
