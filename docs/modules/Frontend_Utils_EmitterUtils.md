# Module: Frontend/Utils/EmitterUtils

## Table of contents

### Interfaces

- [Diff](../interfaces/Frontend_Utils_EmitterUtils.Diff.md)

### Functions

- [generateDiffEmitter](Frontend_Utils_EmitterUtils.md#generatediffemitter)
- [getArtifactId](Frontend_Utils_EmitterUtils.md#getartifactid)
- [getArtifactOwner](Frontend_Utils_EmitterUtils.md#getartifactowner)
- [getDisposableEmitter](Frontend_Utils_EmitterUtils.md#getdisposableemitter)
- [getObjectWithIdFromMap](Frontend_Utils_EmitterUtils.md#getobjectwithidfrommap)
- [getPlanetId](Frontend_Utils_EmitterUtils.md#getplanetid)
- [getPlanetOwner](Frontend_Utils_EmitterUtils.md#getplanetowner)
- [setObjectSyncState](Frontend_Utils_EmitterUtils.md#setobjectsyncstate)

## Functions

### generateDiffEmitter

▸ **generateDiffEmitter**<`Obj`\>(`emitter`): `Monomitter`<[`Diff`](../interfaces/Frontend_Utils_EmitterUtils.Diff.md)<`Obj`\> \| `undefined`\>

Wraps an existing emitter and emits an event with the current and previous values

#### Type parameters

| Name  |
| :---- |
| `Obj` |

#### Parameters

| Name      | Type                                | Description                        |
| :-------- | :---------------------------------- | :--------------------------------- |
| `emitter` | `Monomitter`<`undefined` \| `Obj`\> | an emitter announcing game objects |

#### Returns

`Monomitter`<[`Diff`](../interfaces/Frontend_Utils_EmitterUtils.Diff.md)<`Obj`\> \| `undefined`\>

---

### getArtifactId

▸ **getArtifactId**(`a`): `ArtifactId`

#### Parameters

| Name | Type       |
| :--- | :--------- |
| `a`  | `Artifact` |

#### Returns

`ArtifactId`

---

### getArtifactOwner

▸ **getArtifactOwner**(`a`): `EthAddress`

#### Parameters

| Name | Type       |
| :--- | :--------- |
| `a`  | `Artifact` |

#### Returns

`EthAddress`

---

### getDisposableEmitter

▸ **getDisposableEmitter**<`Obj`, `Id`\>(`objMap`, `objId`, `objUpdated$`): `Monomitter`<`Obj` \| `undefined`\>

Create a monomitter to emit objects with a given id from a cached map of ids to objects. Not intended for re-use

#### Type parameters

| Name  |
| :---- |
| `Obj` |
| `Id`  |

#### Parameters

| Name          | Type                | Description                                             |
| :------------ | :------------------ | :------------------------------------------------------ |
| `objMap`      | `Map`<`Id`, `Obj`\> | the cached map of `<Id, Obj>`                           |
| `objId`       | `Id`                | the object id to select                                 |
| `objUpdated$` | `Monomitter`<`Id`\> | emitter which indicates when an object has been updated |

#### Returns

`Monomitter`<`Obj` \| `undefined`\>

---

### getObjectWithIdFromMap

▸ **getObjectWithIdFromMap**<`Obj`, `Id`\>(`objMap`, `objId$`, `objUpdated$`): `Monomitter`<`Obj` \| `undefined`\>

Create a monomitter to emit objects with a given id from a cached map of ids to objects.

#### Type parameters

| Name  |
| :---- |
| `Obj` |
| `Id`  |

#### Parameters

| Name          | Type                               | Description                                             |
| :------------ | :--------------------------------- | :------------------------------------------------------ |
| `objMap`      | `Map`<`Id`, `Obj`\>                | the cached map of `<Id, Obj>`                           |
| `objId$`      | `Monomitter`<`undefined` \| `Id`\> | the object id to select                                 |
| `objUpdated$` | `Monomitter`<`Id`\>                | emitter which indicates when an object has been updated |

#### Returns

`Monomitter`<`Obj` \| `undefined`\>

---

### getPlanetId

▸ **getPlanetId**(`p`): `LocationId`

#### Parameters

| Name | Type     |
| :--- | :------- |
| `p`  | `Planet` |

#### Returns

`LocationId`

---

### getPlanetOwner

▸ **getPlanetOwner**(`p`): `EthAddress`

#### Parameters

| Name | Type     |
| :--- | :------- |
| `p`  | `Planet` |

#### Returns

`EthAddress`

---

### setObjectSyncState

▸ **setObjectSyncState**<`Obj`, `Id`\>(`objectMap`, `myObjectMap`, `address`, `objUpdated$`, `myObjListUpdated$`, `getId`, `getOwner`, `obj`): `void`

Utility function for setting a game entity into our internal data stores in a way
that is friendly to our application. Caches the object into a map, syncs it to a map
of our owned objects, and also emits a message that the object was updated.

#### Type parameters

| Name  |
| :---- |
| `Obj` |
| `Id`  |

#### Parameters

| Name                | Type                               | Description                                     |
| :------------------ | :--------------------------------- | :---------------------------------------------- |
| `objectMap`         | `Map`<`Id`, `Obj`\>                | map that caches known objects                   |
| `myObjectMap`       | `Map`<`Id`, `Obj`\>                | map that caches known objects owned by the user |
| `address`           | `undefined` \| `EthAddress`        | the user's account address                      |
| `objUpdated$`       | `Monomitter`<`Id`\>                | emitter for announcing object updates           |
| `myObjListUpdated$` | `Monomitter`<`Map`<`Id`, `Obj`\>\> | -                                               |
| `getId`             | (`o`: `Obj`) => `Id`               | -                                               |
| `getOwner`          | (`o`: `Obj`) => `EthAddress`       | -                                               |
| `obj`               | `Obj`                              | the object we want to cache                     |

#### Returns

`void`
