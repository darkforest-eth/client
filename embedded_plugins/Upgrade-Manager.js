// Upgrade Manager
//
// upgrades all the planets in your empire every minute according to a pattern (d = defense, r = range, s = speed)
// for example, if the pattern is "rrrsd" a rank 3 planet that can upgrade will choose to upgrade the speed branch

import {
    SpaceType,
    PlanetType,
  } from "https://cdn.skypack.dev/@darkforest_eth/types";
  
  // if planet is not at max rank and has enough silver
  const planetCanUpgrade = (planet) => {
    const totalRank = planet.upgradeState.reduce((a, b) => a + b);
    if (planet.spaceType === SpaceType.NEBULA && totalRank >= 3) return false;
    if (planet.spaceType === SpaceType.SPACE && totalRank >= 4) return false;
    if (planet.spaceType === SpaceType.DEEP_SPACE && totalRank >= 5) return false;
    if (planet.spaceType === SpaceType.DEAD_SPACE && totalRank >= 5) return false;
    return (
      planet.planetLevel !== 0 &&
      planet.planetType === PlanetType.PLANET &&
      planet.silver >= silverNeededForUpgrade(planet)
    );
  };
  
  const silverNeededForUpgrade = (planet) => {
    const totalLevel = planet.upgradeState.reduce((a, b) => a + b);
    return (totalLevel + 1) * 0.2 * planet.silverCap;
  };
  
  const upgradablePlanets = () => {
    return df.getMyPlanets().filter(planetCanUpgrade);
  };
  
  // upgrades planet, using a pattern
  // just a rudimentary implementation that takes the branch that should be upgraded from the nth letter of the pattern, where n is the current rank
  const upgradePlanet = (planet, pattern) => {
    const rank = planet.upgradeState.reduce((a, b) => a + b, 0);
    if (pattern.length <= rank) return;
    const upgradeBranch = ["d", "r", "s"].indexOf(pattern[rank]);
    df.upgrade(planet.locationId, upgradeBranch);
  };
  
  const upgradeAllPlanets = (pattern) => {
    upgradablePlanets().forEach((p) => upgradePlanet(p, pattern));
  };
  
  class UpgradeManager {
    async render(container) {
      // brief explanation on the syntax
      const tutorial = document.createElement("div");
      tutorial.innerText = "d = defense, r = range, s = speed";
      tutorial.style.fontSize = "11px";
      tutorial.style.marginBottom = "10px";
  
      const patternLabel = document.createElement("label");
      patternLabel.innerText = "Upgrade pattern:";
      patternLabel.htmlFor = "pattern";
      patternLabel.style.display = "block";
  
      const patternInput = document.createElement("input");
      patternInput.value = "rrrrs";
      patternInput.id = "pattern";
      patternInput.style.display = "block";
  
      const upgradePlanetsButton = document.createElement("button");
      upgradePlanetsButton.innerText = "Start Upgrading!";
      upgradePlanetsButton.style.marginTop = "1em";
      upgradePlanetsButton.style.display = "block";
  
      // determines to either start or cancel upgrading when the button above is clicked
      let upgradingToggle = true;
  
      // upgrade all planets once per minute
      upgradePlanetsButton.onclick = () => {
        if (upgradingToggle) {
          upgradeAllPlanets([...patternInput.value]);
          this.upgradePlanetsInterval = window.setInterval(
            () => upgradeAllPlanets([...patternInput.value]),
            1e3 * 30
          );
        } else {
          window.clearInterval(this.upgradePlanetsInterval);
        }
        upgradingToggle = !upgradingToggle;
        upgradePlanetsButton.innerText = upgradingToggle
          ? "Start Upgrading!"
          : "Stop Upgrading";
      };
  
      container.append(
        tutorial,
        patternLabel,
        patternInput,
        upgradePlanetsButton
      );
      patternInput.focus();
    }
  
    destroy() {
      window.clearInterval(this.upgradePlanetsInterval);
    }
  }
  export default UpgradeManager;