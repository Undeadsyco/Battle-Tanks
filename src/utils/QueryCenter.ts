import { Component, IWorld, Query, defineQuery, enterQuery, exitQuery } from "bitecs"

type queries = {
  entering?: Query,
  existing: Query,
  exiting?: Query,
}

type entityCallback = (world: IWorld, entity: number) => void;

export default class QueryCenter {
  static createQueries(list: Component[], enter: boolean = false, exit: boolean = false): queries {
    const existing = defineQuery(list);
    const entering = enter ? enterQuery(existing) : undefined;
    let exiting = exit ? exitQuery(existing) : undefined;
    return ({
      entering,
      existing,
      exiting,
    });
  }

  static runQueries(world: IWorld, queries: queries, updateCallback?: entityCallback, enterCallback?: entityCallback, exitCallback?: entityCallback) {
    const existingEntitites = queries.existing(world);
    const enteringEntities = queries.entering ? queries.entering(world) : undefined;
    const exitingEntities = queries.exiting ? queries.exiting(world) : undefined;

    if (enteringEntities && enterCallback) enteringEntities.forEach(entity => { enterCallback(world, entity); });
    if (existingEntitites && updateCallback) existingEntitites.forEach(entity => { updateCallback(world, entity); });
    if (exitingEntities && exitCallback) exitingEntities.forEach(entity => { exitCallback(world, entity); });
  }
}