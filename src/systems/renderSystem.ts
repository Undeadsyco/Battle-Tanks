import { IWorld, defineSystem } from "bitecs";
import { stateComponents, entityComponents } from "../components";
import { entityEventKeys, tankEventKeys } from "../../types/keys/event";
import { EventCenter, QueryCenter } from "../utils";
import Level from "../scenes/Level";

export default (scene: Level) => {
  const { Tank } = entityComponents;
  const { Position, Angle } = stateComponents;
  const tankQueries = QueryCenter.createQueries([Tank, Position, Angle], true)

  const enterTank = (world: IWorld, entity: number) => {
    EventCenter.emitter.emit(`${scene.scene.key}-${entityEventKeys.CREATE_TANK_ENTITY}`, ({
      id: entity,
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
    QueryCenter.runQueries(world, tankQueries, updateTank, enterTank);

    return world;
  });
}