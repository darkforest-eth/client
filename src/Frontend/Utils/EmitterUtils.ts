import { Artifact, EthAddress, Planet } from '@darkforest_eth/types';
import { monomitter, Monomitter } from './Monomitter';

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

  const pushId = (id: Id | undefined) => {
    selectedObj$.publish(id ? objMap.get(id) : undefined);
  };

  objId$.subscribe((id: Id | undefined) => {
    pushId(id);
    lastId = id;
  });

  objUpdated$.subscribe((id: Id) => {
    if (lastId && lastId === id) pushId(id);
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

/* i'm slightly worried that function literals would have to get allocated and de-allocated
   all the time - the below functions exist in order to prevent that */

export const getPlanetId = (p: Planet) => p.locationId;
export const getPlanetOwner = (p: Planet) => p.owner;

export const getArtifactId = (a: Artifact) => a.id;
export const getArtifactOwner = (a: Artifact) => a.currentOwner;
