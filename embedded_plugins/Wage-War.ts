// Wage War
//
// This plugin is used to grab statistics about a user-specified empire. Once
// information is grabbed, the plugin ranks the target empire's planets by their
// ability to attack you and by their ability to reinforce themselves. If you so
// choose, you can wage an automated war on them, using your planets to attack
// their with timed attacks in order of highest-value.

import { html, render, useState, useEffect } from 'https://unpkg.com/htm/preact/standalone.module.js';

/* start-region:config */
// Test mode toggle. Test mode stops transactions from being created, so dev can check target priority is correct
const TEST_MODE = false;

// Never send more than 70% of total energyCap to attack, always maintain 30% defense threshold
const DEFENSE_MAINTENANCE_MANDATORY_PERCENTAGE = 30;

// Don't account attackers that can't deal more than 3% of total energyCap in damage
const ATTACK_RELEVANCE_THRESHOLD = 0.03;

// Don't let attack proceed unless attacker has >= 80% of it's energyCap
const ATTACK_MIN_ENERGY_PERCENTAGE = 0.8;

// Modify asteroid score to de-prioritize
const ASTEROID_SCORE_MODIFIER = 0.5;

// Make attack land with between 1.1x and 1.7x energyCap of target planet effective energy-defense
const ATTACK_MIN_LANDING_THRESHOLD = 1.1
const ATTACK_MAX_LANDING_THRESHOLD = 1.7

// Don't determine a feeder to be relevant if it can't feed more than 2% of total energyCap to recipient
const FEEDER_RELEVANCE_THRESHOLD = 0.015;

// Max attacking fleet movements
const MAX_ATTACKERS = 6;
const ATTACKER_PLANET_MIN_LEVEL = 3;
/* end-region:config */

/* start-region:validators */
const isRelevantPlanetLevel = (planet) => planet.planetLevel >= ATTACKER_PLANET_MIN_LEVEL
const isTargetOwner = (targetAddress) => (planet) => (planet.owner || "").toLowerCase() === targetAddress.toLowerCase()
/* end-region:validators */

/* start-region:styles */
const listStyles = {
    display: 'flex',
    flex: 1
}

const listItemStyle = {
    marginRight: '5px'
}

const buttonStyle = {
    disabled: {
        backgroundColor: 'white',
        color: 'black'
    }
}
/* end-region:styles */

/* start-region:utils */
const truncate = (str) => {
    return `${str.slice(4, 8)}...${str.slice(-4)}`
}

const formatNumber = (num) => {
    if (num < 1000) return `${num.toFixed(0)}`;
    const suffixes = ['', 'K', 'M', 'B', 'T', 'q', 'Q'];
    let log000 = 0;
    let rem = num;
    while (rem / 1000 >= 1) {
        rem /= 1000;
        log000++;
    }

    if (log000 === 0) return `${Math.floor(num)}`;
    if (rem < 10) return `${rem.toFixed(2)}${suffixes[log000]}`;
    else if (rem < 100) return `${rem.toFixed(1)}${suffixes[log000]}`;
    /*rem < 1000*/ else return `${rem.toFixed(0)}${suffixes[log000]}`;
};

const calcEffectiveDefense = (defense, energyCap) => energyCap * (defense / 100)

const calcWarringPotential = (df) => (predator, defenseThreshold = 0) => (prey) => {
    if (!prey.locationId || !prey.location || !prey.location.coords || !predator.locationId) {
        return 0
    }
    try {
        const sending = predator.energyCap * (parseInt(100 - defenseThreshold) / 100); // @todo: calculate predator energyCap as a factor of full energyCap at max level instead of predator.energyCap.
        const arriving = Math.floor(df.getEnergyArrivingForMove(predator.locationId, prey.locationId, df.getDist(predator.locationId, prey.locationId), sending) / (prey.defense / 100)); // @todo: calcualte prey defense as factor of max-level defense possible.
        return Math.floor(arriving * 100 / prey.energyCap) > ATTACK_RELEVANCE_THRESHOLD * 100
            ? arriving
            : 0
    } catch (e) {
        return 0
    }
}

const calcFeedingPotential = (df) => (krill, defenseThreshold = 0) => (beneficiary) => {
    if (!beneficiary.locationId || !beneficiary.location || !beneficiary.location.coords || !krill.locationId) {
        return 0
    }
    try {
        const sending = krill.energyCap * (parseInt(100 - defenseThreshold) / 100); // @todo: calculate krill feeding potential as a factor of full energyCap at max level instead of krill.energyCap.
        const arriving = Math.floor(df.getEnergyArrivingForMove(krill.locationId, beneficiary.locationId, df.getDist(krill.locationId, beneficiary.locationId), sending));
        return Math.floor(arriving * 100 / beneficiary.energyCap) > FEEDER_RELEVANCE_THRESHOLD * 100
            ? arriving
            : 0
    } catch (e) {
        return 0
    }
}

const calcAllWarringPotential = (df) => (predator, mine = false) => (preyPlanets) => {
    let totalWarringPotential = 0;
    const defenseThreshold = mine
        ? DEFENSE_MAINTENANCE_MANDATORY_PERCENTAGE
        : 0
    preyPlanets.forEach((prey) => {
        const warringPotential = calcWarringPotential(df)(predator, defenseThreshold)(prey)
        if (warringPotential > 0) {
            totalWarringPotential += warringPotential
        }
    })
    return totalWarringPotential;
}

const calcAllFeedingPotential = (df) => (krill, mine = false) => (beneficiarys) => {
    let totalFeederPotential = 0;
    const defenseThreshold = mine
        ? DEFENSE_MAINTENANCE_MANDATORY_PERCENTAGE
        : 0
    beneficiarys.forEach((beneficiary) => {
        const feederPotential = calcWarringPotential(df)(krill, defenseThreshold)(beneficiary)
        if (feederPotential > 0) {
            totalFeederPotential += feederPotential
        }
    })
    return totalFeederPotential;
}

const calculateAttack = (df) => (myPlanetsReadyForAttack, targetPlanet) => {
    let attack = [];
    //const mandatoryDefenseMaintenance = parseInt(100 - DEFENSE_MAINTENANCE_MANDATORY_PERCENTAGE) / 100
    const targetEffectiveDefense = calcEffectiveDefense(targetPlanet.defense, targetPlanet.energyCap)
    myPlanetsReadyForAttack.forEach((myPlanet) => {
        // Always maintain maintenance defense threshold
        const sending = Math.floor(myPlanet.energy - (myPlanet.energyCap * DEFENSE_MAINTENANCE_MANDATORY_PERCENTAGE / 100))
        const energyArrivingGivenThreshold = Math.floor(
            df.getEnergyArrivingForMove(
                myPlanet.locationId,
                targetPlanet.locationId,
		df.getDist(myPlanet.locationId, targetPlanet.locationId),
                sending
            )
        );

        // If attack (respecting defense maintenance mandatory limit), does not surpase the attack relevance
        // threshold (including target planet defense) for the targetPlanet, don't include the attack.
        if (targetEffectiveDefense * ATTACK_RELEVANCE_THRESHOLD <= energyArrivingGivenThreshold) {
            attack.push({
                myAttacker: myPlanet,
                targetDefender: targetPlanet,
                sending,
                arriving: energyArrivingGivenThreshold,
                attackEfficiency: energyArrivingGivenThreshold / sending,
                timeNeededForMove: df.getTimeForMove(myPlanet.locationId, targetPlanet.locationId),
                targetEffectiveDefense
            })
        }
    })
    // leave at most the top 6 attacks.
    const cutAttack = attack.sort((a, b) => b.arriving - a.arriving).slice(0, MAX_ATTACKERS)

    // reduce number of attacks needed further to limit attacking resources to only what is necessary.
    const attackTotal = cutAttack.reduce((acc, item, idx) =>
        idx === 0 || acc.totalArriving < Math.floor(ATTACK_MAX_LANDING_THRESHOLD * targetEffectiveDefense)
            ? ({
                totalArriving: acc.totalArriving + item.arriving,
                attacks: [
                    ...acc.attacks,
                    item
                ]
            }) : acc
        , { totalArriving: 0, attacks: [] })
    const fullAssault = attackTotal.attacks
    // determines energy landing on the target
    const attackLanding = fullAssault.reduce((acc, cur) => acc + cur.arriving, 0)
    if (attack.length > 0 && attackLanding > Math.floor(ATTACK_MIN_LANDING_THRESHOLD * targetEffectiveDefense)) {
        console.log(`[WAGE WAR]: Info: Attack possible on lvl ${targetPlanet.planetLevel} (${targetPlanet.upgradeState.reduce((acc, cur) => cur + acc, 0)}) planet ${truncate(targetPlanet.locationId)} with ${attackLanding} / ${targetEffectiveDefense}`, cutAttack.length, cutAttack)
        return fullAssault;
    } else {
        return [];
    }
}
/* end-region:utils */

/* start-region:transaction-utils */
function scheduleMove(source, dest, energy, silver, delay) {
    console.log('[WAGE WAR]: Schedule', { delay, source, dest, energy, silver });
    return window.setTimeout(() => {
        console.log('[WAGE WAR]: Attack', { source, dest, energy, silver });
        df.move(source, dest, energy, silver);
    }, delay);
}
/* end-region:transaction-utils */

/* start-region:components */

const MyWarringParticipants = ({ myRelevantEntities, centerPlanet, myScheduledAttacks = [], attacksInProgress = [] }) => {
    const myPlanets = myRelevantEntities.filter(({ warringPotential, feedingPotential }) =>
        warringPotential !== 0).sort((a, b) => { b.effectiveDefense - a.effectiveDefense })
    const thStyles = {
        overflowWrap: 'break-word',
        paddingLeft: "3px"
    }
    const myPlanetStatus = {}
    myScheduledAttacks.reduce((allAttacks, attack) => [...allAttacks, ...attack], []).forEach(scheduledAttack => {
        myPlanetStatus[scheduledAttack.myAttacker.locationId] = "Scheduled";
    })
    attacksInProgress.reduce((allAttacks, attack) => [...allAttacks, ...attack.scheduledAttack], []).forEach(inProgressAttack => {
        myPlanetStatus[inProgressAttack.myAttacker.locationId] = "Attacking";
    })
    return html`
        <div>
            <table>
                <thead>
                    <tr>
                        <th style=${thStyles}>Planet Lvl (upgrade)</th>
                        <th style=${thStyles}>Location ID</th>
                        <th style=${thStyles}>Warring Potential</th>
                        <th style=${thStyles}>Feeding Potential</th>
                        <th style=${thStyles}>Effective Defense</th>
                        <th style=${thStyles}>Planet Warring Score</th>
                        <th style=${thStyles}>Attack Status</th>
                    </tr>
                </thead>
                <tbody>
                ${myPlanets.map(myPlanet => {
        return html`
                        <tr onClick=${() => centerPlanet({ x: myPlanet.location.coords.x, y: myPlanet.location.coords.y })}>
                            <th>${`${myPlanet.planetLevel} (${myPlanet.upgradeState.reduce((acc, cur) => cur + acc, 0)})`}</th>
                            <th>${truncate(myPlanet.locationId)}</th>
                            <th>${formatNumber(myPlanet.warringPotential || 0)}</th>
                            <th>${formatNumber(myPlanet.feedingPotential || 0)}</th>
                            <th>${formatNumber(myPlanet.effectiveDefense)}</th>
                            <th>${formatNumber(myPlanet.warringScore)}</th>
                            <th>${myPlanetStatus[myPlanet.locationId] || "Waiting"}</th>
                        </tr>
                    `
    })}
                </tbody>
            </table>
        </div>
    `
}

const TargetInput = ({ handleTargetUpdate, targetAddr, toggleWageWar, wageWar }) => {
    const [addr, setAddr] = useState(undefined)
    const inputTextStyling = {
        flex: '1',
        padding: '5px',
        outline: 'none',
        color: 'black',
    };
    const onSubmit = (e) => {
        e.preventDefault();
        handleTargetUpdate(e.target.target.value)
    }

    const onChange = (e) => {
        const { value: val } = e.target
        setAddr(val)
    }

    return html`
    <div>
        <form onSubmit=${onSubmit}>
            <label>Specified Target: </label>
            <input
                style=${inputTextStyling}
                placeholder="target address"
                type="text"
                minlength="42"
                maxlength="42"
                id="target"
                onChange=${onChange}
                value=${addr}
            />
            <button type="submit" style=${{ marginLeft: "5px" }}>
                Evaluate Target
            </button>
            <br />
            ${targetAddr && html`
                <button onClick=${() => toggleWageWar()}>${wageWar ? "End War" : "Begin War"}</button>
                ${wageWar && html`<span style=${{ marginLeft: '5px', fontWeight: 'bold' }}>Currently Waging War</span>`}
            `}
        </form>
    </div>
    `
}

const WarStats = ({ myRelevantEntities = [], targetRelevantEntities = [], targetAddr, totalTargetPlanetsLength }) => {
    // Determines various stats about my war-making potentials
    const myWarringEntities = myRelevantEntities.filter(({ warringPotential }) => warringPotential !== 0).sort((a, b) => { b.warringPotential - a.warringPotential })
    const myFeedingEntities = myRelevantEntities.filter(({ feedingPotential }) => feedingPotential !== 0).sort((a, b) => { b.feedingPotential - a.feedingPotential })
    const myTotalWarringPotential = myWarringEntities.reduce((acc, entity) => acc + entity.warringPotential, 0)
    const myTotalFeedingPotential = myFeedingEntities.reduce((acc, entity) => acc + entity.feedingPotential, 0)

    // Determines various stats about targets war-making potentials
    const targetWarringEntities = targetRelevantEntities.filter(({ warringPotential }) => warringPotential !== 0).sort((a, b) => { b.warringPotential - a.warringPotential })
    const targetFeedingEntities = targetRelevantEntities.filter(({ feedingPotential }) => feedingPotential !== 0).sort((a, b) => { b.feedingPotential - a.feedingPotential })
    const targetTotalWarringPotential = targetWarringEntities.reduce((acc, entity) => acc + entity.warringPotential, 0)
    const targetTotalFeedingPotential = targetFeedingEntities.reduce((acc, entity) => acc + entity.feedingPotential, 0)
    return html`
        <div>
            <div style=${{ fontWeight: "bold" }}>My Warring Stats</div>
            <div>My Relevant Entities: ${myRelevantEntities.length}</div>
            <div>My Feeding Potential: ${formatNumber(myTotalFeedingPotential)} energy | ${myFeedingEntities.length} planets</div>
            ${targetAddr && targetAddr != '' && html`
                <div>My Warring Potential: ${formatNumber(myTotalWarringPotential)} energy | ${myWarringEntities.length} planets</div>
                <br />
                <div style=${{ fontWeight: "bold" }}>Target Warring Stats</div>
                <div>Target Relevant Entities: ${targetRelevantEntities.length} of ${totalTargetPlanetsLength} visible planets</div>
                <div>Target Feeding Potential: ${formatNumber(targetTotalFeedingPotential)} energy | ${targetFeedingEntities.length} planets</div>
                <div>Target Warring Potential: ${formatNumber(targetTotalWarringPotential)} energy | ${targetWarringEntities.length} planets</div>
            `}
        </div>
    `
}

const TargetPriorities = ({ targetRelevantEntities = [], centerPlanet, toggleFeederTargetPriority, toggleIgnoreAsteroidBelts, ignoreAsteroidBelts, feederTargetPriority, myScheduledAttacks = [], attacksInProgress = [] }) => {
    const defenseTargetRelevantEntities = targetRelevantEntities.filter(({ feedingPotential, warringPotential }) =>
        feedingPotential
        && warringPotential
    )
    const easyTargets = defenseTargetRelevantEntities.filter(({ warringPotential }) =>
        warringPotential !== 0
        || feedingPotential !== 0).sort((a, b) => { b.effectiveDefense - a.effectiveDefense })
    const thStyles = {
        overflowWrap: 'break-word',
        paddingLeft: "3px"
    }
    const targetStatus = {}
    myScheduledAttacks.reduce((allAttacks, attack) => [...allAttacks, ...attack], []).forEach(scheduledAttack => {
        targetStatus[scheduledAttack.targetDefender.locationId] = "Scheduled";
    })
    attacksInProgress.reduce((allAttacks, attack) => [...allAttacks, ...attack.scheduledAttack], []).forEach(inProgressAttack => {
        targetStatus[inProgressAttack.targetDefender.locationId] = "Attacking";
    })
    return html`
        <div>
            <label>
                Designate Feeder Planets as Priority Targets?
            </label>
            <input style=${{ marginLeft: "5px" }} type="checkbox" value=${feederTargetPriority} onChange=${toggleFeederTargetPriority} />
            <br />
            <label>
                Ignore Asteroid Belts?
            </label>
            <input style=${{ marginLeft: "5px" }} type="checkbox" value=${!ignoreAsteroidBelts} onChange=${toggleIgnoreAsteroidBelts} />
            <table>
                <thead>
                    <tr>
                        <th style=${thStyles}>Overall Target Score</th>
                        <th style=${thStyles}>Planet Lvl (upgrade)</th>
                        <th style=${thStyles}>Location ID</th>
                        <th style=${thStyles}>Warring Potential</th>
                        <th style=${thStyles}>Feeding Potential</th>
                        <th style=${thStyles}>Effective Defense</th>
                        <th style=${thStyles}>Feeder Target Score</th>
                        <th style=${thStyles}>Warring Target Score</th>
                        <th style=${thStyles}>Attack Status</th>
                    </tr>
                </thead>
                <tbody>
                ${easyTargets.map(target => {
        return html`
                        <tr onClick=${() => centerPlanet({ x: target.location.coords.x, y: target.location.coords.y })}>
                            <th>${formatNumber(target.overallScore)}</th>
                            <th>${`${target.planetLevel} (${target.upgradeState.reduce((acc, cur) => cur + acc, 0)})`}</th>
                            <th>${truncate(target.locationId)}</th>
                            <th>${formatNumber(target.warringPotential || 0)}</th>
                            <th>${formatNumber(target.feedingPotential || 0)}</th>
                            <th>${formatNumber(target.effectiveDefense)}</th>
                            <th>${formatNumber(target.feederScore)}</th>
                            <th>${formatNumber(target.warringScore)}</th>
                            <th>${targetStatus[target.locationId] || "Waiting"}</th>
                        </tr>
                    `
    })}
                </tbody>
            </table>
        </div>
    `
}

const Tabs = {
    'Stats': {
        tabName: 'Stats',
        Component: WarStats
    },
    'Target Priority': {
        tabName: 'Target Priority',
        Component: TargetPriorities
    },
    'My Participants': {
        tabName: 'My Participants',
        Component: MyWarringParticipants
    }
}

// Renders Full Plugin
const WageWarApp = ({
    centerPlanet,
    targetAddr,
    handleTargetUpdate,
    selectedTab,
    handleSelectTab,
    wageWar,
    toggleWageWar,
    feederTargetPriority,
    attacksInProgress,
    myScheduledAttacks,
    ignoreAsteroidBelts,
    toggleFeederTargetPriority,
    toggleIgnoreAsteroidBelts,
    myRelevantEntities,
    targetRelevantEntities,
    totalTargetPlanetsLength
}) => {
    return html`
        <div>
            <${TargetInput} handleTargetUpdate=${handleTargetUpdate} toggleWageWar=${toggleWageWar} targetAddr=${targetAddr} wageWar=${wageWar} />
            <br />
            <ul style=${listStyles}>
                ${Object.values(Tabs).map(tab => html`
                    <li style=${listItemStyle}>
                        ${selectedTab === tab.tabName
            ? html`
                                <button
                                    style=${{ color: "black", backgroundColor: "white" }}
                                    disabled=${selectedTab === tab.tabName}
                                    onClick=${() => handleSelectTab(tab.tabName)}
                                >
                                    ${tab.tabName}
                                </button>`
            : html`
                                <button
                                    style=${{ color: "white", backgroundColor: "black" }}
                                    disabled=${selectedTab === tab.tabName}
                                    onClick=${() => handleSelectTab(tab.tabName)}
                                >
                                    ${tab.tabName}
                                </button>`
        }
                    </li>
                `)}
            </ul>
            <${Tabs[selectedTab].Component}
                myRelevantEntities=${myRelevantEntities}
                targetRelevantEntities=${targetRelevantEntities}
                totalTargetPlanetsLength=${totalTargetPlanetsLength}
                centerPlanet=${centerPlanet}
                targetAddr=${targetAddr}
                attacksInProgress=${attacksInProgress}
                myScheduledAttacks=${myScheduledAttacks}
                ignoreAsteroidBelts=${ignoreAsteroidBelts}
                toggleWageWar=${toggleWageWar}
                toggleIgnoreAsteroidBelts=${toggleIgnoreAsteroidBelts}
                feederTargetPriority=${feederTargetPriority}
                toggleFeederTargetPriority=${toggleFeederTargetPriority}
            />
        </div>
    `;
}

class Plugin {
    constructor() {
        this.lastLocationId = null;
        this.myPlanetsAll = Array.from(df.getMyPlanets()).filter(isRelevantPlanetLevel);
        this.planetList = document.createElement('div');
        this.selectedTab = Tabs['Stats'].tabName;
        this.wageWar = false;
        this.myScheduledAttacks = []; // [][]
        this.attacksInProgress = [];
        this.finishedAttacks = [];
        this.feederTargetPriority = true;
        this.ignoreAsteroidBelts = false;
    }

    handleSelectTab = (tabName, container) => {
        this.selectedTab = tabName
        this.renderAll(container)
    }

    toggleWageWar = (container) => {
        this.wageWar = !this.wageWar;
        this.renderAll(container)
    }

    handleTargetUpdate = (target, container) => {
        this.targetAddr = target
        this.renderAll(container)
    }

    toggleFeederTargetPriority = (container) => {
        this.feederTargetPriority = !this.feederTargetPriority
        this.renderAll(container)
    }

    toggleIgnoreAsteroidBelts = container => {
        this.ignoreAsteroidBelts = !this.ignoreAsteroidBelts
        this.renderAll(container)
    }

    centerPlanet = (coords) => {
        let planet = df.getPlanetWithCoords(coords);
        if (planet) {
            this.lastLocationId = planet.locationId;
        }
        ui.centerPlanet(planet);
    }

    handleAttacks = () => {

        if (!this.wageWar) return;
        if (this.myScheduledAttacks.length > 0) {
            const fullAttack = this.myScheduledAttacks.shift()
            const maxTime = Math.floor(Math.max(...fullAttack.map((p) => p.timeNeededForMove)));
            const minTime = Math.floor(Math.min(...fullAttack.map((p) => p.timeNeededForMove)));
            if (!TEST_MODE) {
                const timers = fullAttack.map(individualAttack =>
                    scheduleMove(
                        individualAttack.myAttacker.locationId,
                        individualAttack.targetDefender.locationId,
                        individualAttack.sending,
                        0,
                        (maxTime - individualAttack.timeNeededForMove) * 1000
                    )
                )
                this.attacksInProgress.push({
                    attackTimers: timers,
                    atkStart: Date.now(),
                    atkEnd: Date.now() + Math.floor(maxTime * 1000),
                    maxTime,
                    minTime,
                    scheduledAttack: fullAttack,
                    targetDefender: fullAttack[0].targetDefender
                })
            }
        }
    }

    renderAll = (container) => {

        // Filter out this.attacksInProgress to remove now-irrelevant attacks
        if (this.attacksInProgress) {
            this.attacksInProgress.forEach((atkInProgress, idx) => {
                if (atkInProgress.atkEnd && Date.now() > atkInProgress.atkEnd) {
                    this.attacksInProgress.splice(idx, 1);
                    this.finishedAttacks.push(atkInProgress)
                }
            })
        }

        this.myPlanetsAll = df.getMyPlanets().filter(isRelevantPlanetLevel);

        // Returns all my relevant entities (warring & feeding) for the war against the specified target.
        const allTargetPlanets = this.targetAddr
            ? Array.from(df.getAllPlanets()).filter(isTargetOwner(this.targetAddr))
            : []
        this.targetPlanets = allTargetPlanets.filter(isRelevantPlanetLevel)
        const myRelevantEntities = Array.from(this.myPlanetsAll).map((planet) => ({
            ...planet,
            feedingPotential: calcAllFeedingPotential(df)(planet, false)(Array.from(this.myPlanetsAll)),
            warringPotential: calcAllWarringPotential(df)(planet, true)(this.targetPlanets)
        })).filter(({ warringPotential, feedingPotential }) => warringPotential !== 0 || feedingPotential !== 0
        ).map((entity) => ({
            ...entity,
            effectiveDefense: calcEffectiveDefense(entity.defense, entity.energyCap),
            warringScore: (entity.warringPotential / calcEffectiveDefense(entity.defense, entity.energyCap)) * (entity.isAsteroidField ? ASTEROID_SCORE_MODIFIER : 1),

        }))

        // Returns all relevant target entities (warring & feeding) for the war against me.
        const targetRelevantEntities = this.targetPlanets.map((planet) => ({
            ...planet,
            isAsteroidField: planet.planetResource === 1,
            feedingPotential: calcAllFeedingPotential(df)(planet)(this.targetPlanets),
            warringPotential: calcAllWarringPotential(df)(planet)(Array.from(this.myPlanetsAll))
        })).filter(({ warringPotential, feedingPotential, isAsteroidField }) =>
            !(this.ignoreAsteroidBelts && isAsteroidField) && (warringPotential !== 0 || feedingPotential !== 0)
        ).map((entity) => ({
            ...entity,
            effectiveDefense: calcEffectiveDefense(entity.defense, entity.energyCap),
            feederScore: (entity.feedingPotential / calcEffectiveDefense(entity.defense, entity.energyCap)) * (entity.isAsteroidField ? ASTEROID_SCORE_MODIFIER : 1),
            warringScore: (entity.warringPotential / calcEffectiveDefense(entity.defense, entity.energyCap)) * (entity.isAsteroidField ? ASTEROID_SCORE_MODIFIER : 1),
            overallScore: ((entity.feedingPotential + entity.warringPotential) / calcEffectiveDefense(entity.defense, entity.energyCap)) * (entity.isAsteroidField ? ASTEROID_SCORE_MODIFIER : 1)
        })).sort((a, b) => this.feederTargetPriority
            ? b.feederScore - a.feederScore
            : b.overallScore - a.overallScore
        );

        let scheduledAttacks = this.myScheduledAttacks
        if (this.wageWar && targetRelevantEntities.length > 0) {
            const attackersInUse = {}
            scheduledAttacks = targetRelevantEntities.map((targetPlanet) => {
                const inScheduled = (this.myScheduledAttacks || []).reduce((allAttacks, attack) => [...allAttacks, ...attack], [])
                const inProgressAttack = (this.attacksInProgress || []).reduce((allAttacks, atk) => [...allAttacks, ...atk.scheduledAttack], [])
                // Filter all attacking entities that aren't currently attacking or scheduled to attack.
                const attackersAvailable = myRelevantEntities.filter((relevantAttacker) =>
                    !attackersInUse[relevantAttacker.locationId]
                    && (relevantAttacker.energy / relevantAttacker.energyCap) > ATTACK_MIN_ENERGY_PERCENTAGE // Check energy present is greater than default maintenance
                    && !inScheduled.find(attack =>
                        attack.myAttacker.locationId === relevantAttacker.locationId)
                    && !inProgressAttack.find(attack =>
                        attack.myAttacker.locationId === relevantAttacker.locationId)
                );
                const overallPlanetAttacks = calculateAttack(df)(attackersAvailable, targetPlanet);
                overallPlanetAttacks.forEach((singleAttack) => {
                    attackersInUse[singleAttack.myAttacker.locationId] = true
                });
                return overallPlanetAttacks;
            }, []).filter(attacks => attacks.length !== 0)
            // Add new scheduled attacks to the state
            this.myScheduledAttacks = [...this.myScheduledAttacks, ...scheduledAttacks];
        }
        render(html`
            <${WageWarApp}
                df=${df}
                myPlanets=${this.myPlanetsAll}
                targetAddr=${this.targetAddr}
                selectedTab=${this.selectedTab}
                wageWar=${this.wageWar}
                targetPlanets=${this.targetPlanets}
                feederTargetPriority=${this.feederTargetPriority}
                myScheduledAttacks=${this.myScheduledAttacks}
                attacksInProgress=${this.attacksInProgress || []}
                ignoreAsteroidBelts=${this.ignoreAsteroidBelts}
                myRelevantEntities=${myRelevantEntities}
                targetRelevantEntities=${targetRelevantEntities}
                totalTargetPlanetsLength=${allTargetPlanets.length}
                centerPlanet=${this.centerPlanet}
                handleTargetUpdate=${(e) => this.handleTargetUpdate(e, container)}
                handleSelectTab=${(e) => this.handleSelectTab(e, container)}
                toggleIgnoreAsteroidBelts=${() => this.toggleIgnoreAsteroidBelts(container)}
                toggleFeederTargetPriority=${() => this.toggleFeederTargetPriority(container)}
                toggleWageWar=${() => this.toggleWageWar(container)}
            />
        `, container);
    }

    destroy() {
        this.attacksInProgress.forEach(attack => {
            attack.attackTimers.forEach(timer => {
                clearTimeout(timer)
            })
        })
        clearInterval(this.loopedRefresh);
    }

    async render(container) {
        container.style.width = '700px';
        container.style.overflow = 'scroll';
        this.renderAll(container);
        this.loopedRefresh = setInterval(() => {
            // If scheduled attacks exist && wageWar toggle is active, trigger attacks.
            if (this.myScheduledAttacks && this.wageWar) {
                this.handleAttacks()
            };
            this.renderAll(container);
        }, 30 * 1000); // loop refresh every 30 secs.
    }
}
/* end-region:components */

export default Plugin;
