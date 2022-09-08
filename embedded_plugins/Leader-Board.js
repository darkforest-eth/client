// Tiny Leaderboard
//
// Shows a tiny leaderboard with a timer (until the round ends)
// Shows the 5 people above and below you on the board
// Hover over the countdown to see the exact date/time in your timezone
// Click a planet from a different player to show them on the leaderboard
// Updates every 60 seconds

const updateTimeInSeconds = 60;
const leaderboardRange = 10; // 10 people above and below you

const emptyAddress = "0x0000000000000000000000000000000000000000";
const reverseOrdering = false;

// ---------------------------------------------------------------

import { getPlayerColor } from "https://cdn.skypack.dev/@darkforest_eth/procedural";
import { DateTime } from 'https://cdn.skypack.dev/luxon';

let roundEndTime = df.getTokenMintEndTimeSeconds()*1000;

function formatDuration(durationMs) {
  if (durationMs < 0) return '';
  const hours = Math.floor(durationMs / 1000 / 60 / 60);
  const minutes = Math.floor((durationMs - hours * 60 * 60 * 1000) / 1000 / 60);
  const seconds = Math.floor((durationMs - hours * 60 * 60 * 1000 - minutes * 60 * 1000) / 1000);
  return (
    timestampSection(hours) + ':' + timestampSection(minutes) + ':' + timestampSection(seconds)
  );
}

function timestampSection(value) {
  return value.toString().padStart(2, '0');
}

function getStrTimeUntilRoundEnds() {
  const currentEpoch = DateTime.utc().toUnixInteger() * 1000;
  const timeUntilEnd = roundEndTime - currentEpoch;
  return timeUntilEnd <= 0 ? "00:00" : formatDuration(timeUntilEnd);
}

// ---------------------------------------------------------------

function formatNumber(num, decimalCount = 1) {
  num = parseInt(num);
  if (num < 1000) return num;
  if (num < 1000000) return (num / 1000).toFixed(decimalCount) + "k";
  if (num < 1000000000) return (num / 1000000).toFixed(decimalCount) + "m";
  if (num < 1000000000000) return (num / 1000000000).toFixed(decimalCount) + "b";
  return (num / 1000000000000, 2).toFixed(decimalCount) + "t";
}

async function downloadLeaderboard() {
  return fetch(`${process.env.AL_SERVER_URL}/leaderboard`)
    .then(response => response.json())
}

function Plugin() {
  var o = {};
  o.div;
  o.div_timer;
  o.div_playerList;
  o.updateTimerInterv = null;
  o.updateLeaderboardInterv = null;
  o.firstRender = true;
  o.leaderboard = [];
  o.centerPlayer = df.account;

  o.init = function() {
    o.updateTimerInterv = setInterval(o.updateTimer, 1000);
    o.updateInterv = setInterval(o.updateLeaderboard, 1000 * updateTimeInSeconds);
    o.updateTimer();
    o.updateLeaderboard();
    window.addEventListener("click", o.onMouseClick);
  }

  o.render = function(container) {
    o.container = container;
    o.container.style.width = '250px';

    o.div_timer = document.createElement('div');
    o.div_timer.style.fontSize = "x-large";
    o.div_timer.style.textAlign = "center";
    o.div_timer.style["margin-top"] = "-10px";
    o.div_timer.title = new Date(roundEndTime).toString();
    container.appendChild(o.div_timer);

    container.appendChild(document.createElement('hr'));

    o.div_playerList = document.createElement('div');
    o.div_playerList.style.width = o.container.offsetWidth+"px";
    container.appendChild(o.div_playerList);

    if (o.firstRender) {
      o.init();
      o.firstRender = false;
    }
  }

  o.destroy = function() {
    if (o.updateInterv !== null)
      clearInterval(o.updateInterv);
    if (o.updateTimerInterv !== null)
      clearInterval(o.updateTimerInterv);
    window.removeEventListener("click", o.onMouseClick);
  }

  o.onMouseClick = function() {
    let selectedPlanet = ui.getSelectedPlanet();
    let newPlayer = selectedPlanet ? selectedPlanet.owner : df.account;
    if (newPlayer === o.centerPlayer) return;
    if (newPlayer === emptyAddress) return;
    o.centerPlayer = newPlayer;
    o.updateLeaderboard();
  }

  o.updateTimer = function() {
    o.div_timer.innerText = getStrTimeUntilRoundEnds();
  }

  o.updateLeaderboard = async function() {
    o.leaderboard = await downloadLeaderboard();
    o.leaderboard = o.leaderboard.entries;
    o.leaderboard.sort((p1, p2) => {
      if (p1.score === undefined || p1.score === null) return 1;
      if (p2.score === undefined || p2.score === null) return -1;
      return reverseOrdering ? p1.score - p2.score : p2.score - p1.score;
    });

    o.div_playerList.innerText = "";
    let table = document.createElement("table");
    table.style.width = o.container.offsetWidth+"px";
    let centerRank = o.getLeaderboardRank(o.centerPlayer);
    let i = centerRank - leaderboardRange;
    if (i < 0) i = 0;
    let max = centerRank + leaderboardRange;
    let lr = leaderboardRange * 2;
    if (max-i < lr) max += lr - (max-i); // show at least leaderboardRange*2 + 1 players
    for ( ; i < o.leaderboard.length && i <= max; ++i) {
      o.addPlayerToBoard(table, o.leaderboard[i], i+1);
    }
    o.div_playerList.appendChild(table);
  }

  o.getLeaderboardRank = function(ethAddress) {
    for (var i = 0; i < o.leaderboard.length; ++i) {
      if (ethAddress === o.leaderboard[i].ethAddress)
        return i;
    }
    return -1;
  }

  o.addPlayerToBoard = function(table, player, rank) {
    let name = player.twitter !== null && player.twitter !== undefined ? player.twitter : player.ethAddress.substr(0, 8);
    name = name.substr(0, 13); // name max length

    const tr = document.createElement('tr');
    tr.style["color"] = getPlayerColor(player.ethAddress);

    function AddTd(tr, text) {
      var td = document.createElement('td');
      td.innerText = text;
      td.style["text-align"] = "center";
      tr.appendChild(td);
    }
    AddTd(tr, rank+".");
    AddTd(tr, name);
    AddTd(tr, player.score);
    table.appendChild(tr);
  }

  return o;
}

class TinyLeaderboardPlugin {
  constructor() {
    this.plugin = Plugin();
  }
  render(container) {
    this.plugin.render(container);
  }
  destroy() {
    this.plugin.destroy();
    this.plugin = null;
  }
}

export default TinyLeaderboardPlugin;
