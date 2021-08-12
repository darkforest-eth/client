import { PlanetType } from '@darkforest_eth/types';
import React from 'react';
import { getPlanetRank, isFullRank } from '../../Backend/Utils/Utils';
import { ScoreLabel } from '../Components/Labels/KeywordLabels';
import { Green, Red, Sub, White } from '../Components/Text';
import { TooltipName } from '../Game/WindowManager';
import { useAccount, useSelectedPlanet, useUIManager } from '../Utils/AppHooks';

export function TwitterHandleTooltipPane() {
  return (
    <div>
      <Sub>
        You may connect your account to <White>Twitter</White>
        <br />
        to identify yourself on the <White>Leaderboard</White>.
      </Sub>
    </div>
  );
}

export function RankTooltipPane() {
  return (
    <div>
      <Sub>
        Your current rank, based on <ScoreLabel />.
      </Sub>
    </div>
  );
}

export function ScoreTooltipPane() {
  return (
    <div>
      <Sub>
        Your current <ScoreLabel /> is the distance between your closest to the center claimed
        planet and the center. Check out the <White>Help Pane</White> for more info on scoring.
      </Sub>
    </div>
  );
}

export function MiningPauseTooltipPane() {
  return (
    <div>
      <Sub>
        Start / Stop your <White>explorer</White>. Your explorerer looks for planets in chunks of{' '}
        <White>16</White> x <White>16</White>.
      </Sub>
    </div>
  );
}

export function MiningTargetTooltipPane() {
  return (
    <div>
      <Sub>
        Change the location of your <White>explorer</White>. Click anywhere on the{' '}
        <White>Game Screen</White>, and your <White>miner</White> will start hashing around that
        chunk.
      </Sub>
    </div>
  );
}

export function CurrentMiningTooltipPane() {
  return (
    <div>
      <Sub>
        The current coordinates of your <White>explorer</White>.
      </Sub>
    </div>
  );
}

export function BonusTooltipPane() {
  return (
    <div>
      <Green>This stat has been randomly doubled!</Green>
    </div>
  );
}

export function SilverTooltipPane() {
  return (
    <div>
      <Sub>
        <White>Silver:</White> the universe's monetary resource. It allows you to buy upgrades. Only
        <White> Asteroid Fields</White> produce silver. They're much rarer than planets!
      </Sub>
    </div>
  );
}

export function EnergyTooltipPane() {
  return (
    <div>
      <Sub>
        <White>Energy:</White> allows you to make moves. Energy grows following an{' '}
        <White>s-curve</White>, and grows fastest at <White>50% capacity</White>.
      </Sub>
    </div>
  );
}

export function PlanetRankTooltipPane() {
  const uiManager = useUIManager();
  const selected = useSelectedPlanet(uiManager);
  const rank = getPlanetRank(selected.value);
  return (
    <div>
      <Sub>
        This planet is{' '}
        <White>{isFullRank(selected.value) ? 'fully upgraded' : 'rank ' + rank}</White>!
      </Sub>
    </div>
  );
}

export function MaxLevelTooltipPane() {
  return (
    <div>
      <Sub>
        This planet is <White>Level 9</White>, making it one of the <br />
        most powerful planets in the galaxy!
      </Sub>
    </div>
  );
}

export function SilverProdTooltipPane() {
  return (
    <div>
      <Sub>
        This planet produces <White>Silver</White>! Use it to buy upgrades!
      </Sub>
    </div>
  );
}

export function SelectedSilverTooltipPane() {
  const uiManager = useUIManager();
  const selected = useSelectedPlanet(uiManager);

  return (
    <div>
      {selected.value ? (
        <>
          <div>
            <Sub>Silver:</Sub>
            <span>{selected.value.silver}</span>
          </div>
          <div>
            <Sub>Cap:</Sub>
            <span>{selected.value.silverCap}</span>
          </div>
          {selected.value.planetType === PlanetType.SILVER_MINE ? (
            <div>
              <Sub>Growth:</Sub>
              <span>{selected.value.silverGrowth * 60}</span>
            </div>
          ) : (
            <div>
              <Red>This planet does not produce silver.</Red>
            </div>
          )}
        </>
      ) : (
        <>Select a planet to view more about its stats.</>
      )}
    </div>
  );
}

export function RangeTooltipPane() {
  return (
    <div>
      <Sub>
        <White>Range:</White> how far you can send your forces. <White>Forces decay</White> the
        farther out you send them. <br />
        Higher range means that you can send forces the same distance with less decay.
      </Sub>
    </div>
  );
}

export function MinEnergyTooltipPane() {
  return (
    <div>
      <Sub>
        The minimum energy you need to send a move from this planet. <br />
        Moves incur a base cost of 5% of the planet's <White>Energy Cap</White>.
      </Sub>
    </div>
  );
}

export function Time50TooltipPane() {
  return (
    <div>
      <Sub>
        Time to <White>50%</White> of full energy.
      </Sub>
    </div>
  );
}

export function Time90TooltipPane() {
  return (
    <div>
      <Sub>
        Time to <White>90%</White> of full energy. Since energy grows on an s-curve, energy growth
        slows drastically by this point.
      </Sub>
    </div>
  );
}

export function EnergyGrowthTooltipPane() {
  return (
    <div>
      <Sub>
        <White>Energy Growth:</White> the maximum growth rate of this planet's energy representing
        the rate at the middle of the <White>s-curve</White>.
      </Sub>
    </div>
  );
}

export function SilverGrowthTooltipPane() {
  return (
    <div>
      <Sub>
        <White>Silver Growth</White>: the per-minute linear growth rate of this planet's silver.
      </Sub>
    </div>
  );
}

export function SilverCapTooltipPane() {
  return (
    <div>
      <Sub>
        <White>Silver Cap</White>: the maximum silver that this planet can hold.
      </Sub>
    </div>
  );
}

export function PiratesTooltipPane() {
  return (
    <div>
      <Sub>
        <Red>This planet has space pirates!</Red> Move energy to unoccupied planets to conquer them!
      </Sub>
    </div>
  );
}

export function UpgradesTooltipPane() {
  return (
    <div>
      <Sub>
        <White>Planet Rank</White>: the number of times you've upgraded your planet.
      </Sub>
    </div>
  );
}

export function ModalHelpTooltipPane() {
  return <div>View patch notes and instructions</div>;
}

export function ModalPlanetDetailsTooltipPane() {
  return <div>View detailed information about the selected planet</div>;
}

export function ModalLeaderboardTooltipPane() {
  return <div>View the top players, and their top planets</div>;
}

export function ModalPlanetDexTooltipPane() {
  return <div>View a list of your planets</div>;
}

export function ModalUpgradeDetailsTooltipPane() {
  return <div>Upgrade the selected planet</div>;
}

export function ModalTwitterVerificationTooltipPane() {
  return <div>Connect your address to Twitter</div>;
}

export function ModalBroadcastTooltipPane() {
  return <div>Broadcast the selected planet's coordinates to the world</div>;
}

export function BonusEnergyCapTooltipPane() {
  return (
    <div>
      <Green>
        This planet's <White>Energy Cap</White> has been randomly doubled!
      </Green>
    </div>
  );
}

export function BonusEnergyGroTooltipPane() {
  return (
    <div>
      <Green>
        This planet's <White>Energy Growth</White> has been randomly doubled!
      </Green>
    </div>
  );
}

export function BonusRangeTooltipPane() {
  return (
    <div>
      <Green>
        This planet's <White>Range</White> has been randomly doubled!
      </Green>
    </div>
  );
}

export function BonusSpeedTooltipPane() {
  return (
    <div>
      <Green>
        This planet's <White>Speed</White> has been randomly doubled!
      </Green>
    </div>
  );
}

export function BonusDefenseTooltipPane() {
  return (
    <div>
      <Green>
        This planet's <White>Defense</White> has been randomly doubled!
      </Green>
    </div>
  );
}

export function ClowntownTooltipPane() {
  const uiManager = useUIManager();
  const selected = useSelectedPlanet(uiManager);
  const account = useAccount(uiManager);

  return (
    <div>
      <span>
        {selected.value?.owner === account
          ? `You are the proud mayor of Clown Town!`
          : `It's a town of clowns...`}
      </span>
    </div>
  );
}

function DefenseTooltipPane() {
  return <div>Planets with higher defense are more resistant to attack.</div>;
}

function SpeedTooltipPane() {
  return <div>Moves sent out from planets with higher speed travel the universe faster.</div>;
}

function ArtifactBuffPane() {
  return <div>A powerful artifact on this planet is influencing this stat!</div>;
}

function PluginsTooltipPane() {
  return <div>Manage plugins, which allow you to add functionality to the client.</div>;
}

function SettingsPane() {
  return <div>Manage settings - export SKEY, manage maps, and more.</div>;
}

function YourArtifacts() {
  return <div>View your artifacts.</div>;
}

const ModalWithdrawSilverTooltipPane = () => <div>Withdraw silver to earn score.</div>;

const Hats = () => <div>Buy hats for the selected planet.</div>;

const FindArtifact = () => (
  <div>
    <Green>This planet has a powerful artifact hidden somewhere!</Green> Maybe you could find it...
  </div>
);

const ArtifactStored = () => <div>This planet has a powerful artifact on it!</div>;

const HashesPerSec = () => <div>hashes / sec</div>;

export function TooltipContent({ name }: { name: TooltipName }) {
  if (name === TooltipName.SilverGrowth) return <SilverGrowthTooltipPane />;
  if (name === TooltipName.SilverCap) return <SilverCapTooltipPane />;
  if (name === TooltipName.Silver) return <SilverTooltipPane />;
  if (name === TooltipName.Energy) return <EnergyTooltipPane />;
  if (name === TooltipName.EnergyGrowth) return <EnergyGrowthTooltipPane />;
  if (name === TooltipName.Range) return <RangeTooltipPane />;
  if (name === TooltipName.TwitterHandle) return <TwitterHandleTooltipPane />;
  if (name === TooltipName.Bonus) return <BonusTooltipPane />;
  if (name === TooltipName.MinEnergy) return <MinEnergyTooltipPane />;
  if (name === TooltipName.Time50) return <Time50TooltipPane />;
  if (name === TooltipName.Time90) return <Time90TooltipPane />;
  if (name === TooltipName.Pirates) return <PiratesTooltipPane />;
  if (name === TooltipName.Upgrades) return <UpgradesTooltipPane />;
  if (name === TooltipName.PlanetRank) return <PlanetRankTooltipPane />;
  if (name === TooltipName.MaxLevel) return <MaxLevelTooltipPane />;
  if (name === TooltipName.SelectedSilver) return <SelectedSilverTooltipPane />;
  if (name === TooltipName.Rank) return <RankTooltipPane />;
  if (name === TooltipName.Score) return <ScoreTooltipPane />;
  if (name === TooltipName.MiningPause) return <MiningPauseTooltipPane />;
  if (name === TooltipName.MiningTarget) return <MiningTargetTooltipPane />;
  if (name === TooltipName.CurrentMining) return <CurrentMiningTooltipPane />;
  if (name === TooltipName.SilverProd) return <SilverProdTooltipPane />;
  if (name === TooltipName.BonusEnergyCap) return <BonusEnergyCapTooltipPane />;
  if (name === TooltipName.BonusEnergyGro) return <BonusEnergyGroTooltipPane />;
  if (name === TooltipName.BonusRange) return <BonusRangeTooltipPane />;
  if (name === TooltipName.BonusSpeed) return <BonusSpeedTooltipPane />;
  if (name === TooltipName.BonusDefense) return <BonusDefenseTooltipPane />;
  if (name === TooltipName.Clowntown) return <ClowntownTooltipPane />;
  if (name === TooltipName.ModalHelp) return <ModalHelpTooltipPane />;
  if (name === TooltipName.ModalPlanetDetails) return <ModalPlanetDetailsTooltipPane />;
  if (name === TooltipName.ModalLeaderboard) return <ModalLeaderboardTooltipPane />;
  if (name === TooltipName.ModalPlanetDex) return <ModalPlanetDexTooltipPane />;
  if (name === TooltipName.ModalUpgradeDetails) return <ModalUpgradeDetailsTooltipPane />;
  if (name === TooltipName.ModalTwitterVerification) return <ModalTwitterVerificationTooltipPane />;
  if (name === TooltipName.ModalTwitterBroadcast) return <ModalBroadcastTooltipPane />;
  if (name === TooltipName.Defense) return <DefenseTooltipPane />;
  if (name === TooltipName.Speed) return <SpeedTooltipPane />;
  if (name === TooltipName.ArtifactBuff) return <ArtifactBuffPane />;
  if (name === TooltipName.ModalPlugins) return <PluginsTooltipPane />;
  if (name === TooltipName.ModalSettings) return <SettingsPane />;
  if (name === TooltipName.ModalYourArtifacts) return <YourArtifacts />;
  if (name === TooltipName.ModalHats) return <Hats />;
  if (name === TooltipName.FindArtifact) return <FindArtifact />;
  if (name === TooltipName.ArtifactStored) return <ArtifactStored />;
  if (name === TooltipName.HashesPerSec) return <HashesPerSec />;
  if (name === TooltipName.ModalWithdrawSilver) return <ModalWithdrawSilverTooltipPane />;

  return <></>;
}
