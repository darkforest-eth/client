# Interface: InitialGameState

[Backend/GameLogic/InitialGameStateDownloader](../modules/Backend_GameLogic_InitialGameStateDownloader.md).InitialGameState

## Table of contents

### Properties

- [allClaimedCoords](Backend_GameLogic_InitialGameStateDownloader.InitialGameState.md#allclaimedcoords)
- [allRevealedCoords](Backend_GameLogic_InitialGameStateDownloader.InitialGameState.md#allrevealedcoords)
- [allTouchedPlanetIds](Backend_GameLogic_InitialGameStateDownloader.InitialGameState.md#alltouchedplanetids)
- [arrivals](Backend_GameLogic_InitialGameStateDownloader.InitialGameState.md#arrivals)
- [artifactsOnVoyages](Backend_GameLogic_InitialGameStateDownloader.InitialGameState.md#artifactsonvoyages)
- [claimedCoordsMap](Backend_GameLogic_InitialGameStateDownloader.InitialGameState.md#claimedcoordsmap)
- [contractConstants](Backend_GameLogic_InitialGameStateDownloader.InitialGameState.md#contractconstants)
- [heldArtifacts](Backend_GameLogic_InitialGameStateDownloader.InitialGameState.md#heldartifacts)
- [loadedPlanets](Backend_GameLogic_InitialGameStateDownloader.InitialGameState.md#loadedplanets)
- [myArtifacts](Backend_GameLogic_InitialGameStateDownloader.InitialGameState.md#myartifacts)
- [paused](Backend_GameLogic_InitialGameStateDownloader.InitialGameState.md#paused)
- [pendingMoves](Backend_GameLogic_InitialGameStateDownloader.InitialGameState.md#pendingmoves)
- [planetVoyageIdMap](Backend_GameLogic_InitialGameStateDownloader.InitialGameState.md#planetvoyageidmap)
- [players](Backend_GameLogic_InitialGameStateDownloader.InitialGameState.md#players)
- [revealedCoordsMap](Backend_GameLogic_InitialGameStateDownloader.InitialGameState.md#revealedcoordsmap)
- [touchedAndLocatedPlanets](Backend_GameLogic_InitialGameStateDownloader.InitialGameState.md#touchedandlocatedplanets)
- [twitters](Backend_GameLogic_InitialGameStateDownloader.InitialGameState.md#twitters)
- [worldRadius](Backend_GameLogic_InitialGameStateDownloader.InitialGameState.md#worldradius)

## Properties

### allClaimedCoords

• `Optional` **allClaimedCoords**: `ClaimedCoords`[]

---

### allRevealedCoords

• **allRevealedCoords**: `RevealedCoords`[]

---

### allTouchedPlanetIds

• **allTouchedPlanetIds**: `LocationId`[]

---

### arrivals

• **arrivals**: `Map`<`VoyageId`, `QueuedArrival`\>

---

### artifactsOnVoyages

• **artifactsOnVoyages**: `Artifact`[]

---

### claimedCoordsMap

• `Optional` **claimedCoordsMap**: `Map`<`LocationId`, `ClaimedCoords`\>

---

### contractConstants

• **contractConstants**: [`ContractConstants`](types_darkforest_api_ContractsAPITypes.ContractConstants.md)

---

### heldArtifacts

• **heldArtifacts**: `Artifact`[][]

---

### loadedPlanets

• **loadedPlanets**: `LocationId`[]

---

### myArtifacts

• **myArtifacts**: `Artifact`[]

---

### paused

• **paused**: `boolean`

---

### pendingMoves

• **pendingMoves**: `QueuedArrival`[]

---

### planetVoyageIdMap

• **planetVoyageIdMap**: `Map`<`LocationId`, `VoyageId`[]\>

---

### players

• **players**: `Map`<`string`, `Player`\>

---

### revealedCoordsMap

• **revealedCoordsMap**: `Map`<`LocationId`, `RevealedCoords`\>

---

### touchedAndLocatedPlanets

• **touchedAndLocatedPlanets**: `Map`<`LocationId`, `Planet`\>

---

### twitters

• **twitters**: [`AddressTwitterMap`](../modules/types_darkforest_api_UtilityServerAPITypes.md#addresstwittermap)

---

### worldRadius

• **worldRadius**: `number`
