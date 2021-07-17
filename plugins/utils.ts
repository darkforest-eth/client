import { Artifact, ArtifactId, ArtifactRarity, ArtifactType, Planet, PlanetType, QueuedArrival, SpaceType, UnconfirmedMove, UpgradeBranchName } from "@darkforest_eth/types"
import { addHours, fromUnixTime, isAfter } from "date-fns"
import { PlanetTypeWeightsBySpaceType } from "../src/_types/darkforest/api/ContractsAPITypes"

export const PlanetTypes: { [ key:string]: PlanetType } = {
  PLANET: 0,
  ASTEROID: 1,
  FOUNDRY: 2,
  RIP: 3,
  QUASAR: 4
}

export const ArtifactTypes: { [ key:string]: ArtifactType } = {
  Unknown: 0,
  Monolith: 1,
  Colossus: 2,
  Spaceship: 3,
  Pyramid: 4,
  Wormhole: 5,
  PlanetaryShield: 6,
  PhotoidCannon: 7,
  BloomFilter: 8,
  BlackDomain: 9,
  MIN: 1,
  MAX: 9
}

export const ArtifactRarities: { [ key:string]: ArtifactRarity } = {
  Unknown: 0,
  Common: 1,
  Rare: 2,
  Epic: 3,
  Legendary: 4,
  Mythic: 5,
  MIN: 1,
  MAX: 5
}

export function isArtifact(pet: Planet | Artifact): pet is Artifact {
  return (pet as Artifact).artifactType !== undefined;
}

export function isAsteroid(p: Planet) {
  return p.planetType === PlanetTypes.ASTEROID
}

export function hasPendingMove(p: Planet) {
  return p.unconfirmedDepartures.length > 0
}

export function energy(p: Planet) {
  return Math.floor(p.energy / p.energyCap * 100);
}

/**
 * df.getMyArtifacts() misses some.. This function loops through
 * all planets and gathers artifacts then combines them with
 * the ones from the inventory to be we don't miss any.
 */
export function getAllArtifacts()
{
  const artifactsFromPlanets = df.getMyPlanets().flatMap(p => {
    const artifacts = df.getArtifactsWithIds(p.heldArtifactIds)
      .filter((a): a is Artifact => !!a)

    // fix bug where onPlanetId isn't set?
    artifacts.forEach(a => {
      if (!a.onPlanetId) {
        console.log(`Fixing onPlanetId for ${p.locationId} with ${a.id})`)
        a.onPlanetId = p.locationId
      }
    })

    return artifacts
  })

  const artifactsFromInventory = df.getMyArtifacts().filter(a => ! a.onPlanetId)
  const artifacts = artifactsFromPlanets.concat(artifactsFromInventory)

  return artifacts
}

const emptyAddress = "0x0000000000000000000000000000000000000000";

export const isUnowned = (planet: Planet) => planet.owner === emptyAddress;

export function isMine(planet: Planet) {
  return planet.owner === df.getAccount()
}

export function planetName(p: Planet) {
  return df.getProcgenUtils().getPlanetName(p)
}

export function getIncomingMoves(p: Planet) {
  const pendingMoves = df.getUnconfirmedMoves()
  const journeys = df.getAllVoyages().filter(p => p.arrivalTime > Date.now() / 1000)

  const incoming: QueuedArrival[] = journeys.filter(j => j.toPlanet === p.locationId)
  const unconfirmed: UnconfirmedMove[] = pendingMoves.filter(m => m.to === p.locationId)

  return [...incoming, ...unconfirmed]
}

export function hasIncomingMove(p: Planet) {
  return getIncomingMoves(p).length > 0
}

export interface Move {
  from: Planet,
  to: Planet,
  energy: number,
  silver?: number,
  artifact?: Artifact
}

export function getPendingEnergy(p: Planet) {
  return p.unconfirmedDepartures.reduce((total, m) => total + m.forces, 0)
}

export function getPendingSilver(p: Planet) {
  return p.unconfirmedDepartures.reduce((total, m) => total + m.silver, 0)
}

export function planetWillHaveMinEnergyAfterMove(move: Move, minEnergy: number) {
  const remainingAfterMove = availableEnergy(move.from) - move.energy
  const percentAfterMove = remainingAfterMove / move.from.energyCap * 100

  return percentAfterMove > minEnergy
}

export function planetCanAcceptMove(move: Move) {
  return getIncomingMoves(move.to).length < 5
}

export function getEnergyNeeded(from: Planet, to: Planet, targetEnergy: number) {
  const energyToTake = isMine(to) ? 0 : to.energy * (to.defense / 100)
  const energyArriving = (to.energyCap * targetEnergy / 100) + energyToTake;

  const energyNeeded = Math.ceil(df.getEnergyNeededForMove(from.locationId, to.locationId, energyArriving));

  // console.log(`${planetName(from)} to ${planetName(to)} will take ${energyNeeded}.`)

  return energyNeeded
}

export function getPlanetRank(planet: Planet) {
  return planet.upgradeState.reduce((a, b) => a + b);
}

export function getPlanetMaxRank(planet: Planet) {
  if (planet.spaceType === SpaceType.NEBULA) return 3;
  else if (planet.spaceType === SpaceType.SPACE) return 4;
  else return 5;
}

export function availableEnergy(planet: Planet) {
  return planet.energy - getPendingEnergy(planet)
}

export function availableSilver(planet: Planet) {
  return planet.silver - getPendingSilver(planet)
}

export function isFindable(planet: Planet) {
  return (
    df.isPlanetMineable(planet) &&
    planet.prospectedBlockNumber !== undefined &&
    !planet.hasTriedFindingArtifact &&
    !planet.unconfirmedFindArtifact &&
    !prospectExpired(planet.prospectedBlockNumber)
  );
}

export function isProspectable(planet: Planet) {
  return df.isPlanetMineable(planet) && planet.prospectedBlockNumber === undefined && !planet.unconfirmedProspectPlanet;
}

export function enoughEnergyToProspect(p: Planet) {
  return energy(p) >= 95.5;
}

export function blocksLeftToProspectExpiration(prospectedBlockNumber: number | undefined) {
  // @ts-ignore
  const currentBlockNumber = df.contractsAPI.ethConnection.blockNumber

  return (prospectedBlockNumber || 0) + 255 - currentBlockNumber;
}

export function prospectExpired(prospectedBlockNumber: number) {
  return blocksLeftToProspectExpiration(prospectedBlockNumber) <= 0;
}

export function canHaveArtifact(planet: Planet) {
  return df.isPlanetMineable(planet) && !planet.hasTriedFindingArtifact
}

export function blocksLeft(p: Planet) {
  return blocksLeftToProspectExpiration(p.prospectedBlockNumber)
}

export function getPlanetRankForBranch(planet: Planet, branch: UpgradeBranchName) {
  return planet.upgradeState.reduce((a, b) => a + b);
}

export function canPlanetUpgrade(planet: Planet) {
  // @ts-ignore
  return df.entityStore.constructor.planetCanUpgrade(planet)
}

export function isReachable(p: Planet) {
  return df.getMyPlanets().some(myPlanet => {
    const dist = df.getDist(p.locationId, myPlanet.locationId)
    const reachable = dist < df.getMaxMoveDist(myPlanet.locationId, 100)

    reachable && console.log(`${planetName(p)} reachable by ${planetName(myPlanet,)} with 100% energy`)

    return reachable
  })
}

export function isActivated(a: Artifact) {
  return a.lastActivated > a.lastDeactivated
}

/**
 * @todo Add 48 hours for wormholes
 */
export function canBeActivated(a: Artifact) {
  const lastDeactivated = fromUnixTime(a.lastDeactivated)
  const canBeActivatedAt = addHours(lastDeactivated, 24)
  return isAfter(new Date, canBeActivatedAt)
}

export const buttonGridStyle = {
  display: 'grid',
  gridAutoFlow: 'column',
  gridColumnGap: '10px'
}

export interface SelectedPlanetProp {
  selectedPlanet: Planet,
}
