declare namespace Phaser.GameObjects {
  interface GameObjectFactory {
    tank(config: import("./").tankConfig): import("../src/prefabs/tanks/Tank").ITank
  }
}