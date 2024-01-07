import { defineSystem } from "bitecs";
import { stateComponents, entityComponents } from "../components";
import { entityEventKeys } from "../script-nodes/managers/scene-scripts/EntityManager";
import { EventCenter, QueryCenter } from "../utils";
import { colorOptions, tankOptions, trackOptions } from "../../types";
import Level from "../scenes/Level";
import Tank from "../prefabs/tanks/Tank";

export default <Scene extends Phaser.Scene>(scene: Scene) => {
  const { Tank } = entityComponents;
  const { Position, Angle } = stateComponents;
  const tankQueries = QueryCenter.createQueries([Tank, Position, Angle], true)

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
  const updateTank = (entity: number) => {
    let gameObject!: Tank | undefined;
    
    scene instanceof Level ? gameObject = scene.getEntity(entity) : null;
    gameObject ? gameObject.setPosition(Position.x[entity], Position.y[entity]) : null;
  }

  return defineSystem(world => {
    QueryCenter.runQueries(world, tankQueries, enterTank, updateTank);

    return world;
  });
}