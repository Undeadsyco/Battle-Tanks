import { Component, IWorld, Query, defineQuery, enterQuery, exitQuery } from "bitecs"

type queries = {
  entering?: Query,
  existing: Query,
  exiting?: Query,
}

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

  static runQueries(world: IWorld, queries: queries, updateCallback?: (entity: number) => void, enterCallback?: (entity: number) => void, exitCallback?: (entity: number) => void) {
    const existingEntitites = queries.existing(world);
    const enteringEntities = queries.entering ? queries.entering(world) : undefined;
    const exitingEntities = queries.exiting ? queries.exiting(world) : undefined;

    if (enteringEntities && enterCallback) enteringEntities.forEach(entity => { enterCallback(entity); });
    if (existingEntitites && updateCallback) existingEntitites.forEach(entity => { updateCallback(entity); });
    if (exitingEntities && exitCallback) exitingEntities.forEach(entity => { exitCallback(entity); });
  }
}