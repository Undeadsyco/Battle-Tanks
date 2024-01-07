import { defineSystem, hasComponent, removeComponent } from "bitecs"
import { entityComponents, stateComponents, updateComponents } from "../components";
import { EventCenter, QueryCenter } from "../utils";
import { stateEventKeys } from "../script-nodes/managers/scene-scripts/StateManager";
import Level from "../scenes/Level";

export default (scene: Level) => {
  const { Tank } = entityComponents, { Position, Angle } = stateComponents, { Velocity, Rotation } = updateComponents;
  const rotatingQueries = QueryCenter.createQueries([Tank, Angle, Rotation], true);
  const movingQueries = QueryCenter.createQueries([Tank, Position, Angle, Velocity], false, true);
  
  const checkPosition = (entity: number) => {
    const maxBorder = 0.9, minBorder = 0.1;
    return ({
      top: Position.y[entity] <= scene.physics.world.bounds.height * minBorder && (Angle.current[entity] > -90 && Angle.current[entity] < 90),
      bottom: Position.y[entity] >= scene.physics.world.bounds.height * maxBorder && (Angle.current[entity] < -90 || Angle.current[entity] > 90),
      left: Position.x[entity] <= scene.physics.world.bounds.width * minBorder && (Angle.current[entity] > -180 && Angle.current[entity] < 0),
      right: Position.x[entity] >= scene.physics.world.bounds.width * maxBorder && (Angle.current[entity] > 0 && Angle.current[entity] < 180),
    });
  }
  const checkHeading = (entity: number) => {
    return ({
      topRight: Angle.current[entity] >= 0 && Angle.current[entity] < 90,
      topLeft: Angle.current[entity] >= -90 && Angle.current[entity] < 0,
      bottomRight: Angle.current[entity] >= 90 && Angle.current[entity] <= 180,
      bottomLeft: Angle.current[entity] <= -90 && Angle.current[entity] >= -180
    })
  }

  const startingRotatingTanks = (entity: number) => {
    const { top, bottom, left, right } = checkPosition(entity);
    const { topLeft, topRight, bottomLeft, bottomRight } = checkHeading(entity);
    let target = 0;
    const rand = Phaser.Math.Between(0, 45) * 2;

    if (top && topRight) target = 90 + rand;
    if (top && topLeft) target = -90 - rand;
    if (bottom && bottomRight) target = 90 - rand;
    if (bottom && bottomLeft) target = -90 + rand;
    if (left && bottomLeft) target = 180 - rand;
    if (left && topLeft) target = 0 + rand;
    if (right && bottomRight) target = -180 + rand;
    if (right && topRight) target = 0 - rand;

    Angle.target[entity] = target;
  }
  const updateRotatingTanks = (entity: number) => {
    if (Angle.current[entity] !== Angle.target[entity]) {
      let heading = Angle.current[entity] + Rotation.speed[entity];
      if (heading > 180 || heading < -180) {
        if (heading > 180) heading = (heading - 360);
        if (heading < -180) heading = (heading + 360);
        // Rotation.speed[entity] = -Rotation.speed[entity];
      }
      
      Angle.current[entity] = heading;
    } else {
      Rotation.speed[entity] = 0;
      removeComponent(scene.getWorld(), Rotation, entity);
    }
  }

  const updateMovingTanks = (entity: number) => {
    // set velocity based on angle
    const radian = Angle.current[entity] * Math.PI / 180;
    Velocity.x[entity] = parseInt((Math.sin(radian) * 4).toFixed(0));
    Velocity.y[entity] = parseInt((-Math.cos(radian) * 4).toFixed(0));

    const { top, bottom, left, right } = checkPosition(entity);
    const { topLeft, topRight, bottomLeft, bottomRight } = checkHeading(entity);
    if (top || bottom || right || left && !hasComponent(scene.getWorld(), Rotation, entity)) {
      const turnLeft = ((top && topLeft) || (bottom && bottomRight) || (left && bottomLeft) || (right && topRight))
      const turnRight = ((top && topRight) || (bottom && bottomLeft) || (left && topLeft) || (right && bottomRight))
      let speed: number = 0;

      if (turnLeft) speed = -2;
      if (turnRight) speed = 2;

      EventCenter.emitter.emit(`${scene.scene.key}-${stateEventKeys.ADD_COMPONENT}`, { entity, list: [{ component: Rotation, values: { speed } }] });
    }

    Position.x[entity] += Velocity.x[entity];
    Position.y[entity] += Velocity.y[entity];

  }
  const stopMovingTanks = (entity: number) => {
    Velocity.x[entity] = 0;
    Velocity.y[entity] = 0;
  }

  return defineSystem(world => {
    QueryCenter.runQueries(world, rotatingQueries, startingRotatingTanks, updateRotatingTanks);
    QueryCenter.runQueries(world, movingQueries, undefined, updateMovingTanks, stopMovingTanks);

    return world;
  })
}