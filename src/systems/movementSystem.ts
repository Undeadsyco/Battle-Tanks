import { defineSystem, hasComponent, removeComponent } from "bitecs"
import { entityComponents, stateComponents, updateComponents } from "../components";
import { EventCenter, QueryCenter, systemUtilFunctions } from "../utils";
import { stateEventKeys } from "../script-nodes/managers/scene-scripts/StateManager";
import Level from "../scenes/Level";

export default (scene: Level) => {
  const { Tank } = entityComponents, { Position, Angle } = stateComponents, { Velocity, Rotation } = updateComponents;
  const { checkHeading, checkPosition, calculateVelocity } = systemUtilFunctions;
  const rotatingQueries = QueryCenter.createQueries([Tank, Position, Angle, Rotation], true);
  const movingQueries = QueryCenter.createQueries([Tank, Position, Angle, Velocity], true, true);

  const startRotatingTanks = (entity: number) => {
    const { any, top, bottom, left, right } = checkPosition(scene, entity);
    const { topLeft, topRight, bottomLeft, bottomRight } = checkHeading(scene, entity);

    let target!: number;
    let rand!: number;

    // check if near edge
    if (any) {
      rand = Phaser.Math.Between(0, 90);
      const topTopLeft = (top && topLeft),
        topTopRight = (top && topRight),
        bottomBottomRight = (bottom && bottomRight),
        bottomBottomLeft = (bottom && bottomLeft),
        leftBottomLeft = (left && bottomLeft),
        leftTopLeft = (left && topLeft),
        rightBottomRight = (right && bottomRight),
        rightBottomLeft = (right && topRight);

      if (topTopRight) target = 90 + rand;
      if (topTopLeft) target = -90 - rand;
      if (bottomBottomRight) target = 90 - rand;
      if (bottomBottomLeft) target = -90 + rand;
      if (leftBottomLeft) target = 180 - rand;
      if (leftTopLeft) target = 0 + rand;
      if (rightBottomRight) target = -180 + rand;
      if (rightBottomLeft) target = 0 - rand;

    } else {
      rand = Phaser.Math.Between(90 / 4, 90);
      target = Phaser.Math.Angle.WrapDegrees(Rotation.speed[entity] === 1 ? Angle.current[entity] + rand : Angle.current[entity] - rand);
    }
    // assign new angle
    Angle.target[entity] = target;
  }
  const updateRotatingTanks = (entity: number) => {

    console.log("curretn",Angle.current[entity],"target", Angle.target[entity], "speed", Rotation.speed[entity])
    // check if current angle is not at target angle
    if (Angle.current[entity] !== Angle.target[entity]) {

      // update current angle
      Angle.current[entity] = Phaser.Math.Angle.WrapDegrees(Angle.current[entity] + Rotation.speed[entity]);
    } else {

      // reset speed
      Rotation.speed[entity] = 0;

      // remove rotation component
      EventCenter.emitter.emit(`${scene.scene.key}-${stateEventKeys.REMOVE_ONE_COMPONENT}`, { entity, obj: { component: Rotation } });
    }
  }

  const startMovingTanks = (entity: number) => {

    // assign random distance
    Velocity.distance[entity] = Phaser.Math.Between(15, 20) * 64;
  }
  const updateMovingTanks = (entity: number) => {
    // set velocity based on angle
    const { x, y } = calculateVelocity(entity);
    Velocity.x[entity] = x;
    Velocity.y[entity] = y;

    const { any, top, bottom, left, right } = checkPosition(scene, entity);
    const { topLeft, topRight, bottomLeft, bottomRight } = checkHeading(scene, entity);
    if (!hasComponent(scene.getWorld(), Rotation, entity) && any) {
      const turnLeft = ((top && topLeft) || (bottom && bottomRight) || (left && bottomLeft) || (right && topRight)),
        turnRight = ((top && topRight) || (bottom && bottomLeft) || (left && topLeft) || (right && bottomRight));
      let speed: number = 0;

      if (turnLeft) speed = -1;
      if (turnRight) speed = 1;

      EventCenter.emitter.emit(`${scene.scene.key}-${stateEventKeys.ADD_ONE_COMPONENT}`, { entity, obj: { component: Rotation, values: { speed } } });
    }

    const x1 = Position.x[entity], y1 = Position.y[entity], x2 = Position.x[entity] + Velocity.x[entity], y2 = Position.y[entity] + Velocity.y[entity]

    if (Velocity.distance[entity] - Phaser.Math.Distance.Between(x1, y1, x2, y2) <= 0) {
      EventCenter.emitter.emit(`${scene.scene.key}-${stateEventKeys.REMOVE_ONE_COMPONENT}`, { entity, obj: { component: Velocity } });
    } else Velocity.distance[entity] -= Math.round(Phaser.Math.Distance.Between(x1, y1, x2, y2));

    Position.x[entity] += Velocity.x[entity];
    Position.y[entity] += Velocity.y[entity];

  }
  const stopMovingTanks = (entity: number) => {
    Velocity.x[entity] = 0;
    Velocity.y[entity] = 0;
  }

  return defineSystem(world => {
    QueryCenter.runQueries(world, rotatingQueries, updateRotatingTanks, startRotatingTanks);
    QueryCenter.runQueries(world, movingQueries, updateMovingTanks, startMovingTanks, stopMovingTanks);

    return world;
  })
}