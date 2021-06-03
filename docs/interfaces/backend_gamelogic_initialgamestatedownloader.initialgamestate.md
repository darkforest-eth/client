# Interface: InitialGameState

[Backend/GameLogic/InitialGameStateDownloader](../modules/backend_gamelogic_initialgamestatedownloader.md).InitialGameState

## Table of contents

### Properties

- [allRevealedCoords](backend_gamelogic_initialgamestatedownloader.initialgamestate.md#allrevealedcoords)
- [allTouchedPlanetIds](backend_gamelogic_initialgamestatedownloader.initialgamestate.md#alltouchedplanetids)
- [arrivals](backend_gamelogic_initialgamestatedownloader.initialgamestate.md#arrivals)
- [artifactsOnVoyages](backend_gamelogic_initialgamestatedownloader.initialgamestate.md#artifactsonvoyages)
- [balance](backend_gamelogic_initialgamestatedownloader.initialgamestate.md#balance)
- [contractConstants](backend_gamelogic_initialgamestatedownloader.initialgamestate.md#contractconstants)
- [gptCreditPriceEther](backend_gamelogic_initialgamestatedownloader.initialgamestate.md#gptcreditpriceether)
- [heldArtifacts](backend_gamelogic_initialgamestatedownloader.initialgamestate.md#heldartifacts)
- [loadedPlanets](backend_gamelogic_initialgamestatedownloader.initialgamestate.md#loadedplanets)
- [myArtifacts](backend_gamelogic_initialgamestatedownloader.initialgamestate.md#myartifacts)
- [myGPTCredits](backend_gamelogic_initialgamestatedownloader.initialgamestate.md#mygptcredits)
- [pendingMoves](backend_gamelogic_initialgamestatedownloader.initialgamestate.md#pendingmoves)
- [planetVoyageIdMap](backend_gamelogic_initialgamestatedownloader.initialgamestate.md#planetvoyageidmap)
- [players](backend_gamelogic_initialgamestatedownloader.initialgamestate.md#players)
- [revealedCoordsMap](backend_gamelogic_initialgamestatedownloader.initialgamestate.md#revealedcoordsmap)
- [touchedAndLocatedPlanets](backend_gamelogic_initialgamestatedownloader.initialgamestate.md#touchedandlocatedplanets)
- [worldRadius](backend_gamelogic_initialgamestatedownloader.initialgamestate.md#worldradius)

## Properties

### allRevealedCoords

• **allRevealedCoords**: RevealedCoords[]

---

### allTouchedPlanetIds

• **allTouchedPlanetIds**: LocationId[]

---

### arrivals

• **arrivals**: _Map_<VoyageId, QueuedArrival\>

---

### artifactsOnVoyages

• **artifactsOnVoyages**: Artifact[]

---

### balance

• **balance**: _number_

---

### contractConstants

• **contractConstants**: [_ContractConstants_](_types_darkforest_api_contractsapitypes.contractconstants.md)

---

### gptCreditPriceEther

• **gptCreditPriceEther**: _number_

---

### heldArtifacts

• **heldArtifacts**: Artifact[][]

---

### loadedPlanets

• **loadedPlanets**: LocationId[]

---

### myArtifacts

• **myArtifacts**: Artifact[]

---

### myGPTCredits

• **myGPTCredits**: _number_

---

### pendingMoves

• **pendingMoves**: QueuedArrival[]

---

### planetVoyageIdMap

• **planetVoyageIdMap**: _Map_<LocationId, VoyageId[]\>

---

### players

• **players**: _Map_<string, Player\>

---

### revealedCoordsMap

• **revealedCoordsMap**: _Map_<LocationId, RevealedCoords\>

---

### touchedAndLocatedPlanets

• **touchedAndLocatedPlanets**: _Map_<LocationId, Planet\>

---

### worldRadius

• **worldRadius**: _number_
