import { CONTRACT_PRECISION } from '../api/ContractsAPI';
import { Planet, QueuedArrival } from '../_types/global/GlobalTypes';
import { hasOwner } from './Utils';

const getSilverOverTime = (
  planet: Planet,
  startTimeMillis: number,
  endTimeMillis: number
): number => {
  if (!hasOwner(planet)) {
    return planet.silver;
  }

  if (planet.silver > planet.silverCap) {
    return planet.silverCap;
  }
  const timeElapsed = endTimeMillis / 1000 - startTimeMillis / 1000;

  return Math.min(
    timeElapsed * planet.silverGrowth + planet.silver,
    planet.silverCap
  );
};

const getEnergyAtTime = (planet: Planet, atTimeMillis: number): number => {
  if (planet.energy === 0) {
    return 0;
  }
  if (!hasOwner(planet)) {
    return planet.energy;
  }
  const timeElapsed = atTimeMillis / 1000 - planet.lastUpdated;
  const denominator =
    Math.exp((-4 * planet.energyGrowth * timeElapsed) / planet.energyCap) *
      (planet.energyCap / planet.energy - 1) +
    1;
  return planet.energyCap / denominator;
};

export const updatePlanetToTime = (
  planet: Planet,
  atTimeMillis: number
): void => {
  if (atTimeMillis < planet.lastUpdated * 1000) {
    // console.error('tried to update planet to a past time');
    return;
  }
  planet.silver = getSilverOverTime(
    planet,
    planet.lastUpdated * 1000,
    atTimeMillis
  );
  planet.energy = getEnergyAtTime(planet, atTimeMillis);
  planet.lastUpdated = atTimeMillis / 1000;
};

export const arrive = (toPlanet: Planet, arrival: QueuedArrival): void => {
  // this function optimistically simulates an arrival
  if (toPlanet.locationId !== arrival.toPlanet) {
    throw new Error(
      `attempted to apply arrival for wrong toPlanet ${toPlanet.locationId}`
    );
  }

  // update toPlanet energy and silver right before arrival
  updatePlanetToTime(toPlanet, arrival.arrivalTime * 1000);

  // apply energy

  const { energyArriving } = arrival;

  if (arrival.player !== toPlanet.owner) {
    // attacking enemy - includes emptyAddress

    if (
      toPlanet.energy >
      Math.floor(
        (energyArriving * CONTRACT_PRECISION * 100) / toPlanet.defense
      ) /
        CONTRACT_PRECISION
    ) {
      // attack reduces target planet's garrison but doesn't conquer it
      toPlanet.energy -=
        Math.floor(
          (energyArriving * CONTRACT_PRECISION * 100) / toPlanet.defense
        ) / CONTRACT_PRECISION;
    } else {
      // conquers planet
      toPlanet.owner = arrival.player;
      toPlanet.energy =
        energyArriving -
        Math.floor(
          (toPlanet.energy * CONTRACT_PRECISION * toPlanet.defense) / 100
        ) /
          CONTRACT_PRECISION;
    }
  } else {
    // moving between my own planets
    toPlanet.energy += energyArriving;
  }

  // apply silver
  if (toPlanet.silver + arrival.silverMoved > toPlanet.silverCap) {
    toPlanet.silver = toPlanet.silverCap;
  } else {
    toPlanet.silver += arrival.silverMoved;
  }
};
