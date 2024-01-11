import { IWorld, defineSystem } from "bitecs";
import { stateComponents, entityComponents } from "../components";
import { levelEventKeys, tankEventKeys } from "../../types/keys/event";
import { EventCenter, QueryCenter } from "../utils";
import Level from "../scenes/Level";

export default (scene: Level) => {
  const { Tank, Spawner } = entityComponents;
  const { Position, Angle } = stateComponents;
  const spawnerQueries = QueryCenter.createQueries([Spawner, Position], true);
  const tankQueries = QueryCenter.createQueries([Tank, Position, Angle], true);

  const enterSpawner = (world: IWorld, entity: number) => {
    EventCenter.emitter.emit(`${scene.scene.key}-${levelEventKeys.ADD_SPAWNER_ENTITY}`, {
      id: Spawner.id[entity],
      x: Position.x[entity],
      y: Position.y[entity],
      max: Spawner.max[entity],
    });
  }
  const updateSpawner = (world: IWorld, entity: number) => { }

  const enterTank = (world: IWorld, entity: number) => {
    EventCenter.emitter.emit(`spawner-${Tank.spawner[entity]}-create-object`, ({
      id: entity,
      spawner: Tank.spawner[entity],
      x: Position.x[entity],
      y: Position.y[entity],
      angle: Angle.current[entity],
      color: Tank.color[entity] as BattleTanks.Types.GameObjects.Tank.colorOptions,
      hullType: Tank.hullType[entity] as BattleTanks.Types.GameObjects.Tank.tankOptions,
      turretType: Tank.turretType[entity] as BattleTanks.Types.GameObjects.Tank.tankOptions,
      barrelType: Tank.barrelType[entity] as BattleTanks.Types.GameObjects.Tank.tankOptions,
      trackType: Tank.trackType[entity] as BattleTanks.Types.GameObjects.Tank.trackOptions,
    }));
  }
  const updateTank = (world: IWorld, entity: number) => {
    EventCenter.emitter.emit(`${tankEventKeys.UPDATE_TANK_POSITION}-${entity}`, Position.x[entity], Position.y[entity]);
    EventCenter.emitter.emit(`${tankEventKeys.UPDATE_TANK_ANGLE}-${entity}`, Angle.current[entity]);
  }

  return defineSystem(world => {
    QueryCenter.runQueries(world, spawnerQueries, updateSpawner, enterSpawner);
    QueryCenter.runQueries(world, tankQueries, updateTank, enterTank);

    return world;
  });
}