// scoreboard plugin for the first dfDAO community round

import { EthAddress } from "@darkforest_eth/types";

// you can click on the different row titles to change how the scoreboard is displayed:

// rank - display the top players or the selected player
// silverArtifacts - sort by silver and artifact score (withdraw silver or discover artifacts to gain score)
// distanceToCenter - sort by distance to center score (hold a revealed lvl 3 planet or higher to gain score)
// destroyedPlanets - sort by destroyed planets score (destroy planets to gain score)

// on default the scoreboard will choose you as center
// click on a players planet to choose someone else as center

// this needs to be changed
const API_URL_GRAPH = 'https://api.thegraph.com/subgraphs/name/cha0sg0d/death-of-the-universe';
const API_URL_NAMES = 'https://api.zkga.me/twitter/all-twitters';

// only count planets that are lvl 3 or higher for calculating the distance from center score
const minPlanetLvlForCenterDistanceScore = 3;

// change the following if you want to disaplay or hide certain rows:
const COLUMN_VISIBLE_HASH = false; // player address
const COLUMN_VISIBLE_NAME = false; // twitter name
const COLUMN_VISIBLE_NAME_OR_HASH = true;
const COLUMN_VISIBLE_SCORE_SILVER_ARTIFACT = true;
const COLUMN_VISIBLE_SCORE_DISTANCE_TO_CENTER = true;
const COLUMN_VISIBLE_SCORE_PLANETS_DESTROYED = true;

const windowWidth = 620;
const windowHeight = 455;
// if enabled you can click on a planet to move the owner of it to the top of the list
const onClickMovePlayerToTheTop = true;
// how often the list updates
const updateTimeInSeconds = 60;
// 7 people above and below you
const leaderboardRange = 7;

const HIGH_NUMBER = 999999999;

const emptyAddress = "0x0000000000000000000000000000000000000000";

// ------------------------------------------------------------------

const roundEndTime = df.getContractConstants().ROUND_END * 1000;

function formatDuration(durationMs: number) {
	if (durationMs < 0) return '';
	const hours = Math.floor(durationMs / 1000 / 60 / 60);
	const minutes = Math.floor((durationMs - hours * 60 * 60 * 1000) / 1000 / 60);
	const seconds = Math.floor((durationMs - hours * 60 * 60 * 1000 - minutes * 60 * 1000) / 1000);
	return (
		timestampSection(hours) + ':' + timestampSection(minutes) + ':' + timestampSection(seconds)
	);
}

function timestampSection(value: number) {
	return value.toString().padStart(2, '0');
}

function getStrTimeUntilRoundEnds() {
	const timeUntilEnd = roundEndTime - Date.now();
	if (timeUntilEnd <= 0) return "00:00";
	else return formatDuration(timeUntilEnd);
}

// ---------------------------------------------------------------

function roundToDecimal(num: number, decimalCount=1) {
	if (decimalCount < 1) return Math.round(num);
	let p = Math.pow(10, decimalCount);
	num = num * p;
	num = Math.round(num) / p;
	return num;
}

function formatNumberForDisplay(num: number, decimalCount=1) {
	if (num < 1e3) return roundToDecimal(num, decimalCount);
	if (num < 1e6) return roundToDecimal(num / 1e3, decimalCount) + "k";
	if (num < 1e9) return roundToDecimal(num / 1e6 , decimalCount) + "m";
	if (num < 1e12) return roundToDecimal(num / 1e9, decimalCount) + "b";
	return roundToDecimal(num / 1e12, decimalCount) + "t";
}

async function downloadTwitterNames() {
	return fetch(API_URL_NAMES)
		.then(response => response.json())
}

// return example: 'hsl(285,100%,70%)'
function getPlayerColor(ethAddress: EthAddress) {
	return df.getProcgenUtils().getPlayerColor(ethAddress);
}

function sortScoreFunc(p1: { score: number | null | undefined; }, p2: { score: number | null | undefined; }) {
	if (p1.score === undefined || p1.score === null) return -1;
	if (p2.score === undefined || p2.score === null) return 1;
	return p2.score - p1.score;
}

// ------------------------------------------------------------------

function getQueryPlayerScores(idGreaterThan=0) {
	return `
{
  players(first:1000, where:{id_gt:"${idGreaterThan}"}) {
    id
    score
    destroyedScore
  }
}`;
}

function getQueryDistanceToCenter(idGreaterThan=0) {
	return `
{
  planets(first:1000, where:{isRevealed:true, destroyed:false, id_gt:"${idGreaterThan}"}) {
	id
    owner {
      id
    }
    revealedRadius
    planetLevel
  }
}`;
}

async function dlGraphQLData(query: any, graphApiUrl=API_URL_GRAPH) {
	const response = await fetch(graphApiUrl, {
		method: 'POST',
		body: JSON.stringify({ query }),
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json',
		},
	});
	return await response.json();
}

async function dlLoopGraphData(createQueryFunc: { (idGreaterThan?: number): string; (idGreaterThan?: number): string; (arg0: number): any; }, arrName: string) {
	let returnArr = [];
	let id = 0;
	for (let i=0; i < 100; ++i) {
		let queryData = await dlGraphQLData(createQueryFunc(id));
		let arr = queryData.data[arrName];
		if (arr.length < 1) break;
		id = arr[arr.length-1].id;
		returnArr.push(...arr);
	}
	return returnArr;
}

async function dlQueryPlayerScores() {
	return await dlLoopGraphData(getQueryPlayerScores, "players");
}
async function dlQueryDistanceToCenter() {
	return await dlLoopGraphData(getQueryDistanceToCenter, "planets");
}

// ------------------------------------------------------------------

function CreatePlayersObject() {
	let o:any = {};
	o.hash = "";
	o.scoreSilverArtifact = 0;
	o.scoreDistanceToCenter = HIGH_NUMBER;
	o.scorePlanetsDestroyed = 0;
	return o;
}

function Column(name: any, funcGetStr: any, funcSortPlayers: any, funcGetDesc=null) {
	let o:any = {};
	o.name = name;
	o.getStr = funcGetStr;
	o.sortPlayers = funcSortPlayers;
	o.getDesc = funcGetDesc;
	return o;
}

function Plugin() {
	
	function createColumnRank() {
		function getStr(player: { hash: string; }) {
			return player.hash.substr(0, 8);
		}
		return Column("rank", getStr, sortScoreFunc);
	}
	function createColumnHash() {
		function getStr(player: { hash: string; }) {
			return player.hash.substr(0, 8);
		}
		function sortPlayers(p1: { hash: number; }, p2: { hash: number; }) {
			if (p1.hash < p2.hash) return -1;
			if (p1.hash > p2.hash) return 1;
			return 0;
		}
		return Column("hash", getStr, sortPlayers);
	}
	function createColumnName() {
		function getStr(player: { hash: any; }) {
			return o.getTwitterName(player.hash).substr(0, 12);
		}
		function sortPlayers(p1: { hash: any; }, p2: { hash: any; }) {
			let n1 = o.getTwitterName(p1.hash);
			let n2 = o.getTwitterName(p2.hash);
			if (n1.length === 0) return 1;
			if (n2.length === 0) return -1;
			if (n1 < n2) return -1;
			if (n1 > n2) return 1;
			return 0;
		}
		return Column("name", getStr, sortPlayers);
	}
	function createColumnNameOrHash() {
		function getStr(player: { hash: string; }) {
			let name = o.getTwitterName(player.hash).substr(0, 12);
			if (name.length < 1) return player.hash.substr(0, 8);
			else return name;
		}
		function sortPlayers(p1: { hash: any; }, p2: { hash: any; }) {
			let n1 = o.getStr(p1.hash);
			let n2 = o.getStr(p2.hash);
			if (n1.length === 0) return 1;
			if (n2.length === 0) return -1;
			if (n1 < n2) return -1;
			if (n1 > n2) return 1;
			return 0;
		}
		return Column("name", getStr, sortPlayers);
	}
	function createColumnScoreSilverArtifact() {
		function getStr(player: { scoreSilverArtifact: number; }) {
			return formatNumberForDisplay(player.scoreSilverArtifact);
		}
		function sortPlayers(p1: { scoreSilverArtifact: number | null | undefined; }, p2: { scoreSilverArtifact: number | null | undefined; }) {
			if (p1.scoreSilverArtifact === undefined || p1.scoreSilverArtifact === null) return -1;
			if (p2.scoreSilverArtifact === undefined || p2.scoreSilverArtifact === null) return 1;
			return p2.scoreSilverArtifact - p1.scoreSilverArtifact;
		}
		return Column("silverArtifacts", getStr, sortPlayers);
	}
	function createColumnScoreDistanceToCenter() {
		function getStr(player: { scoreDistanceToCenter: number; }) {
			if (player.scoreDistanceToCenter === HIGH_NUMBER) return "none";
			return formatNumberForDisplay(player.scoreDistanceToCenter);
		}
		function sortPlayers(p1: { scoreDistanceToCenter: number | null | undefined; }, p2: { scoreDistanceToCenter: number | null | undefined; }) {
			if (p1.scoreDistanceToCenter === undefined || p1.scoreDistanceToCenter === null) return 1;
			if (p2.scoreDistanceToCenter === undefined || p2.scoreDistanceToCenter === null) return -1;
			return p1.scoreDistanceToCenter - p2.scoreDistanceToCenter;
		}
		return Column("distanceToCenter", getStr, sortPlayers);
	}
	function createColumnScorePlanetsDestroyed() {
		function getStr(player: { scorePlanetsDestroyed: number; }) {
			return formatNumberForDisplay(player.scorePlanetsDestroyed);
		}
		function sortPlayers(p1: { scorePlanetsDestroyed: number | null | undefined; }, p2: { scorePlanetsDestroyed: number | null | undefined; }) {
			if (p1.scorePlanetsDestroyed === undefined || p1.scorePlanetsDestroyed === null) return -1;
			if (p2.scorePlanetsDestroyed === undefined || p2.scorePlanetsDestroyed === null) return 1;
			return p2.scorePlanetsDestroyed - p1.scorePlanetsDestroyed;
		}
		return Column("destroyedPlanets", getStr, sortPlayers);
	}
					
	let o:any = {};
	o.columns = [];
	o.players = {}; // index is player address
	o.playerList = [];
	o.allPlayers;
	o.div;
	o.div_timer;
	o.div_downloading;
	o.div_playerList;
	o.updateTimerInterv = null;
	o.updateInterv = null;
	o.firstRender = true;
	o.twitterNames = null;
	o.sortByColumn = null;
	o.selectedPlayer = df.getPlayer()?.address;
	o.centerPlayerInList = true;

	o.initColumns = function() {
		o.columns.push(createColumnRank());
		if (COLUMN_VISIBLE_HASH) o.columns.push(createColumnHash());
		if (COLUMN_VISIBLE_NAME) o.columns.push(createColumnName());
		if (COLUMN_VISIBLE_NAME_OR_HASH) o.columns.push(createColumnNameOrHash());
		if (COLUMN_VISIBLE_SCORE_SILVER_ARTIFACT) o.columns.push(createColumnScoreSilverArtifact());
		if (COLUMN_VISIBLE_SCORE_DISTANCE_TO_CENTER) o.columns.push(createColumnScoreDistanceToCenter());
		if (COLUMN_VISIBLE_SCORE_PLANETS_DESTROYED) o.columns.push(createColumnScorePlanetsDestroyed());
		o.sortByColumn = o.columns[o.columns.length-1]; // default sort by previous column added
	}
	
	o.init = function() {
		if (COLUMN_VISIBLE_NAME || COLUMN_VISIBLE_NAME_OR_HASH) {
			downloadTwitterNames().then(twitter => {
				o.twitterNames = twitter;
				o.drawPlayerList();
			});
		}
		o.update();
		o.updateTimerInterv = setInterval(o.updateTimer, 1000);
		o.updateInterv = setInterval(o.update, 1000 * updateTimeInSeconds);
		window.addEventListener("click", o.onMouseClick);
		o.onMouseClick();
	}

	o.render = function(div: { style: { width: string; height: string; color: string; backgroundColor: string; }; appendChild: (arg0: HTMLHRElement) => void; }) {
		if (o.columns.length < 1) o.initColumns();
		o.div = div;
		div.style.width = windowWidth+"px";
		div.style.height = windowHeight+"px";
		div.style.color = "#FFF";
		div.style.backgroundColor = "#000";

		o.div_timer = document.createElement('div');
		o.div_timer.style.fontSize = "x-large";
		o.div_timer.style.textAlign = "center";
		o.div_timer.style["margin-top"] = "-10px";
		div.appendChild(o.div_timer);
		
		div.appendChild(document.createElement('hr'));
		
		o.div_playerList = document.createElement('div');
		div.appendChild(o.div_playerList);
		
		o.div_downloading = document.createElement('div');
		o.div_downloading.style.position = "absoulte";
		o.div_downloading.style.textAlign = "center";
		o.div_downloading.style.fontSize = "x-large";
		o.div_downloading.innerHTML = "<br><br>downloading...";
		div.appendChild(o.div_downloading);

		if (o.firstRender) {
			o.init();
			o.firstRender = false;
		}
	}

	o.destroy = function() {
		if (o.updateTimerInterv !== null)
			clearInterval(o.updateTimerInterv);
		if (o.updateInterv !== null)
			clearInterval(o.updateInterv);
		window.removeEventListener("click", o.onMouseClick);
	}
	
	o.onMouseClick = function() {
		let newPlayer = ui.getSelectedPlanet() ? ui.getSelectedPlanet()?.owner : df.getPlayer()?.address;
		if (newPlayer === emptyAddress) newPlayer = df.getPlayer()?.address;
		if (newPlayer === o.selectedPlayer) return;
		o.selectedPlayer = newPlayer;
		if (!onClickMovePlayerToTheTop) return;
		o.sortPlayerList();
		o.drawPlayerList();
	}

	function createNewPlayer(hash: string | number) {
		o.players[hash] = CreatePlayersObject();
		o.players[hash].hash = hash;
	}
	
	o.updatePlayerScores = async function() {
		let players = await dlQueryPlayerScores();
		for (let p of players) {
			if (p.id === emptyAddress) continue;
			if (!o.players[p.id]) createNewPlayer(p.id);
			o.players[p.id].scoreSilverArtifact = p.score;
			o.players[p.id].scorePlanetsDestroyed = p.destroyedScore;
		}
	}
	o.updateDistanceToCenter = async function() {
		let planets = await dlQueryDistanceToCenter();
		for (let p of Object.values(o.players)) {
            //@ts-expect-error
			p.distanceToCenter = HIGH_NUMBER;
		}
		for (let p of planets) {
			if (p.planetLevel < minPlanetLvlForCenterDistanceScore)
				continue;
			let hash = p.owner.id;
			if (hash === emptyAddress) continue;
			if (!o.players[hash]) createNewPlayer(hash);
			let dist = p.revealedRadius;
			if (dist > o.players[hash].scoreDistanceToCenter)
				continue;
			o.players[hash].scoreDistanceToCenter = dist;
		}
	}
	
	o.update = async function() {
		await o.updatePlayerScores();
		await o.updateDistanceToCenter();
		if (o.div_downloading) {
			o.div.removeChild(o.div_downloading);
			o.div_downloading = null;
		}
		o.playerList = Object.values(o.players);
		o.sortPlayerList();
		o.drawPlayerList();
	}
	
	o.updateTimer = function() {
		o.div_timer.innerText = getStrTimeUntilRoundEnds();
	}
	
	o.sortPlayerList = function() {
		if (o.sortByColumn) {
			o.playerList.sort(o.sortByColumn.sortPlayers);
		}
	}

	o.drawPlayerList = function() {
		o.div_playerList.innerText = "";
		let table = document.createElement('table');
		table.width = (parseInt(o.div.style.width)-20) + "px";
		{
			const tr = document.createElement('tr');
			for (let c of o.columns) {
				let th = document.createElement('th');
				if (c === o.sortByColumn) th.style.fontStyle = "italic";
				th.innerText = c.name;
				tr.appendChild(th);
				if (c.name === "name" || c.name === "hash") {
					continue;
				}
				th.style.cursor = "pointer";
				th.addEventListener("mouseenter", ()=>{
					th.style.color = "#000000";
					th.style.backgroundColor = "#FFFFFF";
				});
				th.addEventListener("mouseleave", ()=>{
					th.style.color = "#FFFFFF";
					th.style.backgroundColor = "#000000";
				});
				if (c.name === "rank") {
					th.onclick=()=>{
						o.centerPlayerInList = !o.centerPlayerInList;
						o.drawPlayerList();
					}
					continue;
				}
				th.onclick=()=>{
					if (c === o.sortByColumn) return;
					o.sortByColumn = c;
					o.sortPlayerList();
					o.drawPlayerList();
				}
			}
			table.appendChild(tr);
		}
		let centerRank;
		if (!o.centerPlayerInList) centerRank = 1;
		else centerRank = o.playerList.findIndex((p: { hash: any; }) => p.hash === o.selectedPlayer);
		if (centerRank < 0) centerRank = 0;
		let lr = leaderboardRange*2;
		let i = centerRank - leaderboardRange;
		if (i+lr > o.playerList.length-1) i -= i+lr - (o.playerList.length-1);
		if (i < 0) i = 0;
		let max = centerRank + leaderboardRange;
		if (max-i < lr) max += lr - (max-i); // show at least leaderboardRange*2 + 1 players
		for ( ; i < o.playerList.length && i <= max; ++i) {
			let player = o.playerList[i];
			const tr = document.createElement('tr');
			tr.style["color"] = getPlayerColor(player.hash);
			tr.style.cursor = "pointer";
			
			if (player.hash === o.selectedPlayer)
				tr.style.backgroundColor = "#333";
			
			{
				let td = document.createElement('td');
                //@ts-expect-error
				td.innerHTML = i+1;
                //@ts-expect-error
				td.style["text-align"] = "center";
				tr.appendChild(td);
			}
			
			for (let c of o.columns) {
				if (c.name === "rank") continue;
				let td = document.createElement('td');
				td.innerHTML = c.getStr(player);
                //@ts-expect-error
				td.style["text-align"] = "center";
				if (c.getDesc) td.title = c.getDesc(player);
				tr.appendChild(td);
			}

			table.appendChild(tr);
		}
		o.div_playerList.appendChild(table);
	}

	o.getTwitterName = function(playerEthAddress: string | number) {
		if (o.twitterNames === null) return "";
		if (!o.twitterNames[playerEthAddress]) return "";
		return o.twitterNames[playerEthAddress];
	}

	return o;
}

/**
 * A plugin is a Class with render and destroy methods.
 * Other than that, you are free to do whatever, so be careful!
 */
class Scoreboard implements DFPlugin {
  private canvas: HTMLCanvasElement;
    plugin: any;

  /**
   * A constructor can be used to keep track of information.
   */
  constructor() {
    this.plugin = Plugin();
  }

  /**
   * A plugin's render function is called once.
   * Here, you can insert custom html into a game modal.
   * You render any sort of UI that makes sense for the plugin!
   */
  async render(container: HTMLDivElement) {
    this.plugin.render(container);
  }

  destroy() {
    this.plugin.destroy();
    this.plugin = null;
  }
}

/**
 * For the game to know about your plugin, you must export it!
 *
 * Use `export default` to expose your plugin Class.
 */
export default Scoreboard;
