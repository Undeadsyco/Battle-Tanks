type Enumerate<N extends number, Acc extends number[] = []> = Acc['length'] extends N
  ? Acc[number]
  : Enumerate<N, [...Acc, Acc['length']]>

type Range<F extends number, T extends number> = Exclude<Enumerate<T>, Enumerate<F>>

export type tankOptions = Range<0, 17>; 
export type trackRange = Range<0, 9>
export type colorOptions = Range<0,4>

export const tankColors = {
  BLUE: 0,
  BROWN: 1,
  CYAN: 2,
  GREEN: 3,
} as const;

export type tankColor = keyof typeof tankColors;

export type vector = { x: number, y: number }
