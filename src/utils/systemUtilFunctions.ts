import { stateComponents } from '../components';

export default {
  calculateVelocity: (entity: number) => {
    const { Angle } = stateComponents;
    const radian = Angle.current[entity] * Math.PI / 180;
    return { x: parseInt((Math.sin(radian) * 4).toFixed(0)), y: parseInt((-Math.cos(radian) * 4).toFixed(0)) }
  },
  checkPosition: (scene: Phaser.Scene, entity: number) => {
    const { Position, Angle } = stateComponents;
    const maxBorder = 0.9, minBorder = 0.1;
    const top = Position.y[entity] <= scene.physics.world.bounds.height * minBorder && (Angle.current[entity] > -90 && Angle.current[entity] < 90),
      bottom = Position.y[entity] >= scene.physics.world.bounds.height * maxBorder && (Angle.current[entity] < -90 || Angle.current[entity] > 90),
      left = Position.x[entity] <= scene.physics.world.bounds.width * minBorder && (Angle.current[entity] > -180 && Angle.current[entity] < 0),
      right = Position.x[entity] >= scene.physics.world.bounds.width * maxBorder && (Angle.current[entity] > 0 && Angle.current[entity] < 180);
    return ({
      any: top || bottom || left || right,
      top,
      bottom,
      left,
      right,
    });
  },
  checkHeading: (scene: Phaser.Scene, entity: number) => {
    const { Angle } = stateComponents;
    return ({
      topRight: Angle.current[entity] >= 0 && Angle.current[entity] < 90,
      topLeft: Angle.current[entity] >= -90 && Angle.current[entity] < 0,
      bottomRight: Angle.current[entity] >= 90 && Angle.current[entity] <= 180,
      bottomLeft: Angle.current[entity] <= -90 && Angle.current[entity] >= -180
    })
  }
}