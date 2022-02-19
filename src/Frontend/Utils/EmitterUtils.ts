import { monomitter, Monomitter } from '@darkforest_eth/events';
import { isSpaceShip } from '@darkforest_eth/gamelogic';
import { Artifact, EthAddress, Planet } from '@darkforest_eth/types';
import _ from 'lodash';

/**
 * Create a monomitter to emit objects with a given id from a cached map of ids to objects.
 * @param objMap the cached map of `<Id, Obj>`
 * @param objId$ the object id to select
 * @param objUpdated$ emitter which indicates when an object has been updated
 */
export function getObjectWithIdFromMap<Obj, Id>(
  objMap: Map<Id, Obj>,
  objId$: Monomitter<Id | undefined>,
  objUpdated$: Monomitter<Id>
): Monomitter<Obj | undefined> {
  let lastId: Id | undefined;

  const selectedObj$ = monomitter<Obj | undefined>();

  const publishIdEvent = (id: Id | undefined) => {
    // emit object associated with id
    selectedObj$.publish(id ? objMap.get(id) : undefined);
  };

  objId$.subscribe((id: Id | undefined) => {
    // Publish event for new object
    publishIdEvent(id);
    //Update tracked object
    lastId = id;
  });

  objUpdated$.subscribe((id: Id) => {
    if (lastId && lastId === id) publishIdEvent(id);
  });

  return selectedObj$;
}

/**
 * Create a monomitter to emit objects with a given id from a cached map of ids to objects. Not intended for re-use
 * @param objMap the cached map of `<Id, Obj>`
 * @param objId the object id to select
 * @param objUpdated$ emitter which indicates when an object has been updated
 */
export function getDisposableEmitter<Obj, Id>(
  objMap: Map<Id, Obj>,
  objId: Id,
  objUpdated$: Monomitter<Id>
): Monomitter<Obj | undefined> {
  const selectedObj$ = monomitter<Obj | undefined>();

  const publishIdEvent = (id: Id | undefined) => {
    // emit value of new id
    selectedObj$.publish(id ? objMap.get(id) : undefined);
  };

  objUpdated$.subscribe((id: Id) => {
    if (objId === id) publishIdEvent(id);
  });

  return selectedObj$;
}

/**
 * Utility function for setting a game entity into our internal data stores in a way
 * that is friendly to our application. Caches the object into a map, syncs it to a map
 * of our owned objects, and also emits a message that the object was updated.
 * @param objectMap map that caches known objects
 * @param myObjectMap map that caches known objects owned by the user
 * @param address the user's account address
 * @param obj the object we want to cache
 * @param objUpdated$ emitter for announcing object updates
 */
export function setObjectSyncState<Obj, Id>(
  objectMap: Map<Id, Obj>,
  myObjectMap: Map<Id, Obj>,
  address: EthAddress | undefined,
  objUpdated$: Monomitter<Id>,
  myObjListUpdated$: Monomitter<Map<Id, Obj>>,
  getId: (o: Obj) => Id,
  getOwner: (o: Obj) => EthAddress,
  obj: Obj
): void {
  objectMap.set(getId(obj), obj);

  let myObjListChanged = false;

  if (address === getOwner(obj)) {
    myObjectMap.set(getId(obj), obj);
    myObjListChanged = true;
  } else if (myObjectMap.has(getId(obj))) {
    myObjectMap.delete(getId(obj));
    myObjListChanged = true;
  }

  objUpdated$.publish(getId(obj));

  if (myObjListChanged) {
    myObjListUpdated$.publish(myObjectMap);
  }
}

/**
 * @param previous The previously emitted state of an object
 * @param current The current emitted state of an object
 */
export interface Diff<Type> {
  previous: Type;
  current: Type;
}

/**
 * Wraps an existing emitter and emits an event with the current and previous values
 * @param emitter an emitter announcing game objects
 */
export function generateDiffEmitter<Obj>(
  emitter: Monomitter<Obj | undefined>
): Monomitter<Diff<Obj> | undefined> {
  let prevInstance: Obj | undefined;
  const currPrevEmitter$ = monomitter<Diff<Obj> | undefined>();
  emitter.subscribe((instance) => {
    currPrevEmitter$.publish({
      current: _.cloneDeep(instance) as Obj,
      previous: prevInstance ? _.cloneDeep(prevInstance) : (_.cloneDeep(instance) as Obj),
    });
    prevInstance = _.cloneDeep(instance);
  });

  return currPrevEmitter$;
}
/* i'm slightly worried that function literals would have to get allocated and de-allocated
   all the time - the below functions exist in order to prevent that */

export const getPlanetId = (p: Planet) => p.locationId;
export const getPlanetOwner = (p: Planet) => p.owner;

export const getArtifactId = (a: Artifact) => a.id;
export const getArtifactOwner = (a: Artifact) => {
  if (isSpaceShip(a.artifactType)) {
    return a.controller;
  }

  return a.currentOwner;
};
