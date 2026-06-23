import { IWalk, ISwim, IMakeSound, IFly } from "./interfaces/animal.interface";

class Dog implements IWalk, ISwim, IMakeSound {
  walk() {
    console.log("Dog is walking");
  }
  swim() {
    console.log("Dog is swimming");
  }

  makeSound() {
    console.log("Woof!");
  }
}

class Eagle implements IWalk, IMakeSound, IFly {
  walk() {
    console.log("Eagle is walking");
  }

  fly() {
    console.log("Eagle is flying");
  }
  makeSound() {
    console.log("Screech!");
  }
}

class Goldfish implements ISwim, IMakeSound {
  swim() {
    console.log("Goldfish is swimming");
  }

  makeSound() {
    console.log("...");
  }
}
