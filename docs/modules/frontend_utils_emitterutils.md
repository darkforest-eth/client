# Module: Frontend/Utils/EmitterUtils

## Table of contents

### Functions

- [getArtifactId](frontend_utils_emitterutils.md#getartifactid)
- [getArtifactOwner](frontend_utils_emitterutils.md#getartifactowner)
- [getObjectWithIdFromMap](frontend_utils_emitterutils.md#getobjectwithidfrommap)
- [getPlanetId](frontend_utils_emitterutils.md#getplanetid)
- [getPlanetOwner](frontend_utils_emitterutils.md#getplanetowner)
- [setObjectSyncState](frontend_utils_emitterutils.md#setobjectsyncstate)

## Functions

### getArtifactId

▸ `Const` **getArtifactId**(`a`: Artifact): ArtifactId

#### Parameters

| Name | Type     |
| :--- | :------- |
| `a`  | Artifact |

**Returns:** ArtifactId

---

### getArtifactOwner

▸ `Const` **getArtifactOwner**(`a`: Artifact): EthAddress

#### Parameters

| Name | Type     |
| :--- | :------- |
| `a`  | Artifact |

**Returns:** EthAddress

---

### getObjectWithIdFromMap

▸ **getObjectWithIdFromMap**<Obj, Id\>(`objMap`: _Map_<Id, Obj\>, `objId$`: [_Monomitter_](frontend_utils_monomitter.md#monomitter)<Id \| undefined\>, `objUpdated$`: [_Monomitter_](frontend_utils_monomitter.md#monomitter)<Id\>): [_Monomitter_](frontend_utils_monomitter.md#monomitter)<Obj \| undefined\>

Create a monomitter to emit objects with a given id from a cached map of ids to objects.

#### Type parameters

| Name  |
| :---- |
| `Obj` |
| `Id`  |

#### Parameters

| Name          | Type                                                                      | Description                                             |
| :------------ | :------------------------------------------------------------------------ | :------------------------------------------------------ |
| `objMap`      | _Map_<Id, Obj\>                                                           | the cached map of `<Id, Obj>`                           |
| `objId$`      | [_Monomitter_](frontend_utils_monomitter.md#monomitter)<Id \| undefined\> | the object id to select                                 |
| `objUpdated$` | [_Monomitter_](frontend_utils_monomitter.md#monomitter)<Id\>              | emitter which indicates when an object has been updated |

**Returns:** [_Monomitter_](frontend_utils_monomitter.md#monomitter)<Obj \| undefined\>

---

### getPlanetId

▸ `Const` **getPlanetId**(`p`: Planet): LocationId

#### Parameters

| Name | Type   |
| :--- | :----- |
| `p`  | Planet |

**Returns:** LocationId

---

### getPlanetOwner

▸ `Const` **getPlanetOwner**(`p`: Planet): EthAddress

#### Parameters

| Name | Type   |
| :--- | :----- |
| `p`  | Planet |

**Returns:** EthAddress

---

### setObjectSyncState

▸ **setObjectSyncState**<Obj, Id\>(`objectMap`: _Map_<Id, Obj\>, `myObjectMap`: _Map_<Id, Obj\>, `address`: EthAddress \| _undefined_, `objUpdated$`: [_Monomitter_](frontend_utils_monomitter.md#monomitter)<Id\>, `myObjListUpdated$`: [_Monomitter_](frontend_utils_monomitter.md#monomitter)<Map<Id, Obj\>\>, `getId`: (`o`: Obj) => Id, `getOwner`: (`o`: Obj) => EthAddress, `obj`: Obj): _void_

Utility function for setting a game entity into our internal data stores in a way
that is friendly to our application. Caches the object into a map, syncs it to a map
of our owned objects, and also emits a message that the object was updated.

#### Type parameters

| Name  |
| :---- |
| `Obj` |
| `Id`  |

#### Parameters

| Name                | Type                                                                    | Description                                     |
| :------------------ | :---------------------------------------------------------------------- | :---------------------------------------------- |
| `objectMap`         | _Map_<Id, Obj\>                                                         | map that caches known objects                   |
| `myObjectMap`       | _Map_<Id, Obj\>                                                         | map that caches known objects owned by the user |
| `address`           | EthAddress \| _undefined_                                               | the user's account address                      |
| `objUpdated$`       | [_Monomitter_](frontend_utils_monomitter.md#monomitter)<Id\>            | emitter for announcing object updates           |
| `myObjListUpdated$` | [_Monomitter_](frontend_utils_monomitter.md#monomitter)<Map<Id, Obj\>\> | -                                               |
| `getId`             | (`o`: Obj) => Id                                                        | -                                               |
| `getOwner`          | (`o`: Obj) => EthAddress                                                | -                                               |
| `obj`               | Obj                                                                     | the object we want to cache                     |

**Returns:** _void_
