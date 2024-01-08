import type { angleSchema, cpuSchema, rotationSchema, tankSchema, vectorSchema, velocitySchema } from "../../types";
import { Types, defineComponent } from "bitecs";

export const entityComponents = {
  Tank: defineComponent<tankSchema>({
    color: Types.ui8,
    hullType: Types.ui8,
    trackType: Types.ui8,
    turretType: Types.ui8,
    barrelType: Types.ui8,
  }),
  Spawner: defineComponent(),
} as const;

export const stateComponents = {
  Position: defineComponent<vectorSchema>({ x: Types.ui32, y: Types.ui32 }),
  Angle: defineComponent<angleSchema>({ current: Types.i16, target: Types.i16 }),
} as const;

export const updateComponents = {
  Velocity: defineComponent<velocitySchema>({ x: Types.i8, y: Types.i8, distance: Types.ui16 }),
  Rotation: defineComponent<rotationSchema>({ speed: Types.i16 }),
} as const;

export const AIComponents = {
  CPU: defineComponent<cpuSchema>({ timer: Types.ui16, interval: Types.ui16 })
}