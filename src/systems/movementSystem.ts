import { defineSystem } from "bitecs"
import { entityComponents, stateComponents, updateComponents } from "../components";
import { QueryCenter } from "../utils";

export default <Scene extends Phaser.Scene>(scene: Scene) => {
  const { Tank } = entityComponents, { Position, Angle } = stateComponents, { Velocity, Rotation } = updateComponents;
  const movingQueries = QueryCenter.createQueries([Tank, Position, Angle, Velocity], true, true);
  const rotatingQueries = QueryCenter.createQueries([Tank, Angle, Rotation]);

  const startingTanks = (entity: number) => {
    // set velocity based on angle
    const radian = Angle.angle[entity] * Math.PI/180;
    Velocity.x[entity] = parseInt((Math.sin(radian) * 5).toFixed(0));
    Velocity.y[entity] = parseInt((-Math.cos(radian) * 5).toFixed(0));
  }
  const movingTanks = (entity: number) => {
    Position.x[entity] += Velocity.x[entity];
    Position.y[entity] += Velocity.y[entity];
  }
  const stopingTanks = (entity: number) => {
    Velocity.x[entity] = 0;
    Velocity.y[entity] = 0;
  }

  return defineSystem(world => {
    QueryCenter.runQueries(world, movingQueries, startingTanks, movingTanks, stopingTanks);

    return world;
  })
}