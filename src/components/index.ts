import { Types, defineComponent } from "bitecs";

const vector = {
  x: Types.f32,
  y: Types.f32
}

export const entityComponents = {
  Tank: defineComponent({
    color: Types.ui8,
    hullType: Types.ui8,
    trackType: Types.ui8,
    turretType: Types.ui8,
    barrelType: Types.ui8,
  }),
  Turret: defineComponent(),
} as const;

export const stateComponents = {
  Position: defineComponent(vector),
  Angle: defineComponent({ current: Types.i16, target: Types.i16 }),
} as const;

export const updateComponents = {
  Velocity: defineComponent(vector),
  Rotation: defineComponent({ speed: Types.i16 }),
} as const;