declare namespace Phaser.GameObjects {
  interface GameObjectFactory {
    tank(config: BattleTanks.Types.GameObjects.Tank.tankConfig): BattleTanks.GameObjects.Tank.ITank
  }
}