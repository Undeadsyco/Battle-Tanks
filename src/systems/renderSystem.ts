import { defineSystem } from "bitecs";
import { stateComponents, entityComponents } from "../components";
import { entityEventKeys } from "../script-nodes/managers/scene-scripts/EntityManager";
import { EventCenter, QueryCenter } from "../utils";
import { colorOptions, tankOptions, trackOptions } from "../../types";

export default (scene: Phaser.Scene) => {
  const { Tank } = entityComponents;
  const { Position, Angle } = stateComponents;
  const tankQueries = QueryCenter.createQueries([Tank, Position, Angle], true)

  return defineSystem(world => {
    const enterTank = (entity: number) => {
      EventCenter.emitter.emit(`${scene.scene.key}-${entityEventKeys.CREATE_TANK_ENTITY}`, ({
        id: entity,
        x: Position.x[entity],
        y: Position.y[entity],
        angle: Angle.angle[entity],
        color: Tank.color[entity] as colorOptions,
        hullType: Tank.color[entity] as tankOptions,
        turretType: Tank.turretType[entity] as tankOptions,
        barrelType: Tank.barrelType[entity] as tankOptions,
        trackType: Tank.trackType[entity] as trackOptions,
      }));
    }
    
    QueryCenter.runQueries(world, tankQueries, enterTank);
    return world;
  });
}