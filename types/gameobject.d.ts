declare namespace Phaser.GameObjects {
  interface GameObjectFactory {
    tank(config: BattleTanks.Types.GameObjects.Tank.config): BattleTanks.GameObjects.Tank.ITank;
    spawner(config: BattleTanks.Types.GameObjects.Spawner.config): BattleTanks.GameObjects.Spawner.ISpawner;
  }
}