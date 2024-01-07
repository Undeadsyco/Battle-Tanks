import { Types, defineComponent } from "bitecs";

const vector = {
  x: Types.ui16,
  y: Types.ui16
}

const angle = Types.i8;

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
  Angle: defineComponent({ angle }),
} as const;

export const updateComponents = {
  Velocity: defineComponent(vector),
  Rotation: defineComponent({ angle }),
} as const;