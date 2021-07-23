// Simultaneous attack
//
// attack thing with many thing at the same time

var pg = df.getProcgenUtils();

// removes all the child nodes of an element
var removeAllChildNodes = (parent) => {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
};

// makes a (sometimes) clickable planet link
// kinda like https://github.com/darkforest-eth/client/blob/304f40a0b05dd111ce834d525c94ee0a5798e82f/src/Frontend/Components/Text.tsx#L237
var planetLink = (locationId, clickable = true) => {
    const planet = df.getPlanetWithId(locationId);
    const planetElement = document.createElement(clickable ? "button" : "span");
    planetElement.innerText = `L${planet.planetLevel}R${planet.upgradeState.reduce((a, b) => a + b, 0)} ${pg.getPlanetName(planet)}`;
    planetElement.title = locationId;
    planetElement.style.textDecoration = "underline";
    planetElement.style.background = "none";
    planetElement.style.border = "none";
    planetElement.style.color = "white";
    planetElement.style.outline = "none";
    planetElement.style.padding = "0";
    if (clickable) {
        planetElement.addEventListener("click", () => {
            ui.centerLocationId(locationId);
        });
    }
    return planetElement;
};

// YOINKED: https://github.com/darkforest-eth/plugins/blob/113b69934bdb270691a5a01612aeecffa105cf59/content/productivity/distribute-silver/plugin.js#L282
// gets all the voyages heading to a planet
var getArrivalsForPlanet = (planet) => {
    return df.getAllVoyages().filter((arrival) => arrival.toPlanet === planet).filter((p) => p.arrivalTime > Date.now() / 1e3);
};

// checks if the amount of unconfirmed moves + confirmed moves is at or more than 6 (the planet move cap limit)
var planetRatelimited = (planet) => {
    return getArrivalsForPlanet(planet.locationId).length + df.getUnconfirmedMoves().filter((move) => move.to === planet.locationId).length >= 6;
};
// attacks from the sources to the planet
// does not take tx or gwei or anything like that into account, but in my testing (which did not include 40 gwei gas prices) the moves only landed a max of 3-4 seconds apart
// returns the timeoutId of the scheduled moves, in case they need to be cancelled
var simultaneousAttack = (target, sources) => {
    const attackTimeouts = [];
    const planetsMoveLengths = sources.map((p) => {
        return { "planet": p, "time": df.getTimeForMove(p.locationId, target.locationId) };
    }).sort((a, b) => a.time - b.time).reverse(); // sort by move duration, then reverse so longest move is at the beginning
    const longestMove = planetsMoveLengths[0].time;
    for (const planetMove of planetsMoveLengths) {
        attackTimeouts.push(window.setTimeout(() => {
            // don't try to send moves if the planet is rate limited
            if (planetRatelimited(target))
                return;

            // recalculate planet to get the correct energy amounts (might not be needed idk?)
            const attacker = df.getPlanetWithId(planetMove.planet.locationId);
            const energyArriving = df.getEnergyArrivingForMove(attacker.locationId, target.locationId, void 0, Math.floor(attacker.energy / 2));
            // if the attacker can't even reach the target, just ignore it
            // maybe somehow show the plugin user this error?
            if (Math.floor(energyArriving) <= 0)
                return;
            df.move(attacker.locationId, target.locationId, Math.floor(attacker.energy * 0.5), 0);
            // waits for the duration of the longest move - the duration of the move itself to be sent. * 1k is to convert seconds to ms
        }, (longestMove - planetMove.time) * 1e3));
    }
    return attackTimeouts;
};
// some useless class idk
class SimultaneousAttack {
    constructor() {
        this.planetAttackers = [];
        this.moveTimeoutIds = [];
        this.planetEnergySendingPercent = 50;
    }
    async render(container) {
        // thingamabob which shows you current selected target planet
        const targetPlanetContainer = document.createElement("div");
        targetPlanetContainer.innerText = "Current target: none";
        // button for setting the target planet
        const setPlanetTargetButton = document.createElement("button");
        setPlanetTargetButton.innerText = "Set target";
        setPlanetTargetButton.addEventListener("click", () => {
            removeAllChildNodes(targetPlanetContainer);
            const targetedPlanet = ui.getSelectedPlanet();
            if (targetedPlanet) {
                this.planetTarget = targetedPlanet.locationId;
            }
            // make the planet either be "none" when nothing is selected, or the planet link.
            targetPlanetContainer.append("Current target: ", targetedPlanet ? planetLink(targetedPlanet.locationId) : "none");
            this.updateDamageCalculations(energyCalculations);
        });
        // button for adding an attacker
        const addPlanetAttackerButton = document.createElement("button");
        addPlanetAttackerButton.innerText = "Add attacker";
        addPlanetAttackerButton.style.marginRight = "10px";
        addPlanetAttackerButton.addEventListener("click", () => {
            const targetedPlanet = ui.getSelectedPlanet();
            // ignore if this planet is in use somewhere
            if (targetedPlanet === void 0 || this.planetAttackers.includes(targetedPlanet.locationId) || this.planetTarget === targetedPlanet.locationId)
                return;
            this.planetAttackers.push(targetedPlanet.locationId);
            planetAttackersTitle.innerText = `Planet attackers: (${this.planetAttackers.length}/6):`;
            const planetRowContainer = document.createElement("div");
            planetRowContainer.append(planetLink(targetedPlanet.locationId), ",");
            planetAttackersContainer.appendChild(planetRowContainer);
            this.updateDamageCalculations(energyCalculations);
        });
        // thing which tells you how many of the 6 planet slots you have left
        // this isn't very strict (doesn't prevent you from adding planets once you have >6 of them) because some might not have enough energy to reach (line #63 & #64)
        const planetAttackersTitle = document.createElement("div");
        planetAttackersTitle.innerText = "Planet attackers (0/6):";
        const clearAttackersButton = document.createElement("button");
        // button for clearing all the attackers
        clearAttackersButton.innerText = "Clear";
        clearAttackersButton.addEventListener("click", () => {
            this.planetAttackers = [];
            removeAllChildNodes(planetAttackersContainer);
            this.updateDamageCalculations(energyCalculations);
            planetAttackersTitle.innerText = `Planet attackers: (${this.planetAttackers.length}/6):`;
        });
        // container for displaying all the attackers in their attacky glory
        const planetAttackersContainer = document.createElement("div");
        planetAttackersContainer.style.maxHeight = `${24 * 5.5}px`;
        planetAttackersContainer.style.overflowX = "scroll";
        planetAttackersContainer.style.marginBottom = "20px";
        // label for showing you how much % energy you are sending
        const planetSendingPercent = document.createElement("div");
        planetSendingPercent.innerText = "Sending 50.0% energy";
        // slider for changing how much energy you send. default is 50%
        const planetSendingPercentSlider = document.createElement("input");
        planetSendingPercentSlider.type = "range";
        planetSendingPercentSlider.max = "100";
        // step is .5 so it's twice as good as the client 8)
        planetSendingPercentSlider.step = ".5";
        planetSendingPercentSlider.addEventListener("input", () => {
            const percentValue = parseFloat(planetSendingPercentSlider.value);
            this.planetEnergySendingPercent = percentValue;
            planetSendingPercent.innerText = `Sending ${percentValue.toFixed(1)}% energy`;
            this.updateDamageCalculations(energyCalculations);
        });
        // container for showing how much energy arrives and how much dmg it will do
        const energyCalculations = document.createElement("div");
        this.updateDamageCalculations(energyCalculations);
        // button for doing the attack
        const attackButton = document.createElement("button");
        attackButton.innerText = "Attack!";
        attackButton.addEventListener("click", () => {
            this.moveTimeoutIds.push(...simultaneousAttack(df.getPlanetWithId(this.planetTarget), this.planetAttackers.map((p) => df.getPlanetWithId(p))));
        });

        // re-calculate every 15 sec
        this.calculationsInterval = setInterval(() => this.updateDamageCalculations(energyCalculations), 15 * 1000);

        // haha wall of text >:D
        container.appendChild(targetPlanetContainer);
        container.appendChild(setPlanetTargetButton);
        container.append(document.createElement("br"), document.createElement("br"));
        container.appendChild(planetAttackersTitle);
        container.appendChild(planetAttackersContainer);
        container.appendChild(addPlanetAttackerButton);
        container.appendChild(clearAttackersButton);
        container.append(document.createElement("br"), document.createElement("br"));
        container.appendChild(planetSendingPercent);
        container.appendChild(planetSendingPercentSlider);
        container.append(document.createElement("br"), document.createElement("br"));
        container.append("Simultaneous attack:\n");
        container.appendChild(energyCalculations);
        container.appendChild(attackButton);
    }
    // returns an object with the damage calculations
    getDamageCalculations() {
        if (this.planetTarget === void 0)
            return { energyArriving: 0, damageDealt: 0 };
        let energyArriving = 0;
        for (const planet of this.planetAttackers) {
            energyArriving += df.getEnergyArrivingForMove(planet, this.planetTarget, void 0, df.getPlanetWithId(planet).energy * (this.planetEnergySendingPercent / 100));
        }
        const damageDealt = energyArriving / (df.getPlanetWithId(this.planetTarget).defense / 100);
        return { energyArriving, damageDealt };
    }
    // displays the damage calculations from above on a container
    updateDamageCalculations(container) {
        const { energyArriving, damageDealt } = this.getDamageCalculations();
        const energyArrivingContainer = document.createElement("div");
        energyArrivingContainer.innerText = `${Math.floor(energyArriving)} energy arriving`;
        const damageDealtContainer = document.createElement("div");
        damageDealtContainer.innerText = `${Math.floor(damageDealt)} damage dealt`;
        if (this.planetTarget !== void 0) {
            if (damageDealt > df.getPlanetWithId(this.planetTarget).energy) {
                damageDealtContainer.style.color = "green";
            } else {
                damageDealtContainer.style.color = "red";
            }
        }
        removeAllChildNodes(container);
        container.append(energyArrivingContainer, damageDealtContainer);
    }
    // deletes the moves
    // good for when someone is panicking and wants to stop everything
    // bad for people who want clean screens
    destroy() {
        window.clearInterval(this.calculationsInterval);
        for (const moveTimeout of this.moveTimeoutIds) {
            window.clearTimeout(moveTimeout);
        }
    }
};

export default SimultaneousAttack;
