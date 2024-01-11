import { IWorld, defineSystem, hasComponent } from "bitecs";
import Level from "../scenes/Level";
import { EventCenter, QueryCenter } from "../utils";
import { entityComponents, AIComponents, updateComponents, stateComponents } from '../components'
import { levelEventKeys } from "../../types/keys/event";

export default (scene: Level) => {
  const { Tank, Spawner } = entityComponents, { CPU } = AIComponents, { Position, Angle } = stateComponents, { Velocity, Rotation } = updateComponents;
  const spawnerBotQueries = QueryCenter.createQueries([Spawner, Position, CPU]);
  const tankBotQueries = QueryCenter.createQueries([Tank, Position, Angle, CPU]);

  const updateSpawnerBot = (world: IWorld, entity: number) => {
    if (CPU.timer[entity] >= CPU.interval[entity] * 1000) {
      if (Spawner.active[entity] < Spawner.max[entity]) EventCenter.emitter.emit(`spawner-${Spawner.id[entity]}-create-state`);
      
      // reset timer
      CPU.timer[entity] = 0;
    } else CPU.timer[entity] += scene.game.loop.delta;
  }

  const updateTankBot = (world: IWorld, entity: number) => {

    // check if timer as reached interval
    if (CPU.timer[entity] >= CPU.interval[entity] * 1000) {

      // checks to see if entity is moving;
      if (hasComponent(world, Velocity, entity)) {

        // generate random number to decide action when moving
        const rand = Phaser.Math.Between(-1, 1);

        // check if its not already turning
        if (rand !== 0 && !hasComponent(world, Rotation, entity)) {

          // add rotation component to tank
          EventCenter.emitter.emit(`${scene.scene.key}-${levelEventKeys.ADD_ONE_COMPONENT}`, { entity, obj: { component: Rotation, values: { speed: rand } } });

          //set new idle interval
          CPU.interval[entity] = Phaser.Math.Between(1, 3) * 1000;
        }
      } else {
        // add velocity start component to start moving
        EventCenter.emitter.emit(`${scene.scene.key}-${levelEventKeys.ADD_ONE_COMPONENT}`, { entity, obj: { component: Velocity } });

        //set new movement interval
        CPU.interval[entity] = Phaser.Math.Between(1, 3) * 1000;
      }

      // reset timer
      CPU.timer[entity] = 0;
    } else {
      // increase timer
      CPU.timer[entity] += scene.game.loop.delta;
    }
  }
  return defineSystem(world => {
    QueryCenter.runQueries(world, spawnerBotQueries, updateSpawnerBot);
    QueryCenter.runQueries(world, tankBotQueries, updateTankBot);

    return world;
  })
}