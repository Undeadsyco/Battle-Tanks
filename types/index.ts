import { Component, ComponentType, ISchema, Type } from "bitecs";

type Enumerate<N extends number, Acc extends number[] = []> = Acc['length'] extends N
  ? Acc[number]
  : Enumerate<N, [...Acc, Acc['length']]>

type Range<F extends number, T extends number> = Exclude<Enumerate<T>, Enumerate<F>>

type optional<T> = { [K in keyof T]?: T[K] }

export type tankOptions = Range<0, 17>;
export type trackOptions = Range<0, 9>
export type colorOptions = Range<0, 4>

export const tankColors = {
  BLUE: 0,
  BROWN: 1,
  CYAN: 2,
  GREEN: 3,
} as const;

export type tankColor = keyof typeof tankColors;

export type vector = { x: number, y: number }

export type tankConfig = {
  id: number,
  x?: number,
  y?: number,
  angle?: number,
  color: colorOptions,
  hullType: tankOptions,
  trackType: trackOptions,
  barrelType: tankOptions,
  turretType: tankOptions,
}

export type optionalTankConfig = optional<tankConfig>

export type tankSchema = {
  color: Type,
  hullType: Type,
  trackType: Type,
  turretType: Type,
  barrelType: Type,
}

export type vectorSchema = {
  x: Type,
  y: Type,
}

export type velocitySchema = {
  x: Type,
  y: Type,
  distance: Type,
}

export type angleSchema = {
  current: Type,
  target: Type,
}

export type rotationSchema = { speed: Type }

export type cpuSchema = {
  timer: Type,
  interval: Type,
}

export type componentConfig<schema extends ISchema = ISchema> = {
  component: ComponentType<schema>;
  values?: { [key: string]: number }
}

export type componentList = componentConfig[];

export type tankComponentList = [componentConfig<tankSchema>, componentConfig<vectorSchema>, componentConfig<angleSchema>, componentConfig<cpuSchema>];
