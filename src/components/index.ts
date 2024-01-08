import { Types, defineComponent } from "bitecs";

export const entityComponents = {
  Tank: defineComponent<BattleTanks.Types.Components.tankSchema>({
    color: Types.ui8,
    hullType: Types.ui8,
    trackType: Types.ui8,
    turretType: Types.ui8,
    barrelType: Types.ui8,
  }),
  Spawner: defineComponent(),
} as const;

export const stateComponents = {
  Position: defineComponent<BattleTanks.Types.Components.vectorSchema>({ x: Types.ui32, y: Types.ui32 }),
  Angle: defineComponent<BattleTanks.Types.Components.angleSchema>({ current: Types.i16, target: Types.i16 }),
} as const;

export const updateComponents = {
  Velocity: defineComponent<BattleTanks.Types.Components.velocitySchema>({ x: Types.i8, y: Types.i8, distance: Types.ui16 }),
  Rotation: defineComponent<BattleTanks.Types.Components.rotationSchema>({ speed: Types.i16 }),
} as const;

export const AIComponents = {
  CPU: defineComponent<BattleTanks.Types.Components.cpuSchema>({ timer: Types.ui16, interval: Types.ui16 })
}