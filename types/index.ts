import { Component, ComponentType, ISchema, Type } from "bitecs";

type Enumerate<N extends number, Acc extends number[] = []> = Acc['length'] extends N
  ? Acc[number]
  : Enumerate<N, [...Acc, Acc['length']]>

type Range<F extends number, T extends number> = Exclude<Enumerate<T>, Enumerate<F>>

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
  color: colorOptions,
  hullType: tankOptions,
  trackType: trackOptions,
  barrelType: tankOptions,
  turretType: tankOptions,
}

export type tankScema = {
  color: Type,
  hullType: Type,
  trackType: Type,
  turretType: Type,
  barrelType: Type,
}

export type vectorScema = {
  x: Type,
  y: Type,
}

export type angleScema = {
  angle: Type,
}

export type componentConfig<scema extends ISchema = ISchema> = {
  component: ComponentType<scema>;
  values: { [key: string]: number }
}

export type componentList = componentConfig[];

export type tankComponentList = [componentConfig<tankScema>, componentConfig<vectorScema>, componentConfig<angleScema>];
