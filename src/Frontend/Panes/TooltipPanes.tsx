import { PlanetType, TooltipName } from '@darkforest_eth/types';
import React from 'react';
import { getPlanetRank, isFullRank } from '../../Backend/Utils/Utils';
import { ScoreLabel, SilverLabel } from '../Components/Labels/KeywordLabels';
import { Green, Red, Text, White } from '../Components/Text';
import { useAccount, useSelectedPlanet, useUIManager } from '../Utils/AppHooks';

export function NetworkHealthPane() {
  return (
    <>
      <White>AltLayer Tx Speed: </White>For each auto gas setting (which you can choose in the{' '}
      <White>Settings</White> Pane), the average amount of time it takes a transaction with that
      setting to confirm. The Dark Forest client uploads diagnostic info (you can turn this off via
      settings), which is aggregated into this network health indicator. I hope you find it helpful
      in cases the network is being slow.
    </>
  );
}

export function WithdrawSilverButton() {
  return (
    <>
      This is a <Text>Spacetime Rip</Text> where you can withdraw <SilverLabel /> for <ScoreLabel />
      !
    </>
  );
}
export function DefenseMultiplierPane() {
  return <>Defense multiplier</>;
}

export function EnergyCapMultiplierPane() {
  return <>EnergyCap multiplier</>;
}

export function EnergyGrowthMultiplierPane() {
  return <>EnergyGrowth multiplier</>;
}

export function RangeMultiplierPane() {
  return <>Range multiplier</>;
}

export function SpeedMultiplierPane() {
  return <>Speed multiplier</>;
}

export function DepositArtifactPane() {
  return <>Deposit this artifact</>;
}

export function DeactivateArtifactPane() {
  return <>Deactivate this artifact</>;
}

export function WithdrawArtifactPane() {
  return <>Withdraw this artifact</>;
}

export function ActivateArtifactPane() {
  return <>Activate this artifact</>;
}

export function TimeUntilActivationPossiblePane() {
  return <>You must wait this amount of time before you can activate this artifact</>;
}

export function TwitterHandleTooltipPane() {
  return (
    <>
      You may connect your account to <White>Twitter</White>
      <br />
      to identify yourself on the <White>Leaderboard</White>.
    </>
  );
}

export function RankTooltipPane() {
  return (
    <>
      Your current rank, based on <ScoreLabel />.
    </>
  );
}

export function ScoreTooltipPane() {
  return (
    <>
      You earn <ScoreLabel /> by finding artifacts and withdrawing silver. Check out the{' '}
      <White>Help Pane</White> for more info on scoring.
    </>
  );
}

export function MiningPauseTooltipPane() {
  return (
    <>
      Start / Stop your <White>explorer</White>. Your explorer looks for planets in chunks of{' '}
      <White>16</White> x <White>16</White>.
    </>
  );
}

export function MiningTargetTooltipPane() {
  return (
    <>
      Change the location of your <White>explorer</White>. Click anywhere on the{' '}
      <White>Game Screen</White>, and your <White>miner</White> will start hashing around that
      chunk.
    </>
  );
}

export function CurrentMiningTooltipPane() {
  return (
    <>
      The current coordinates of your <White>explorer</White>.
    </>
  );
}

export function BonusTooltipPane() {
  return (
    <>
      <Green>This stat has been randomly doubled!</Green>
    </>
  );
}

export function SilverTooltipPane() {
  return (
    <>
      <White>Silver:</White> the universe's monetary resource. It allows you to buy upgrades. Only
      <White> Asteroid Fields</White> produce silver or so we've been told...
    </>
  );
}

export function EnergyTooltipPane() {
  return (
    <>
      <White>Energy:</White> allows you to make moves. Energy grows following an{' '}
      <White>s-curve</White>, and grows fastest at <White>50% capacity</White>.
    </>
  );
}

export function PlanetRankTooltipPane() {
  const uiManager = useUIManager();
  const selected = useSelectedPlanet(uiManager);
  const rank = getPlanetRank(selected.value);
  return (
    <>
      This planet is <White>{isFullRank(selected.value) ? 'fully upgraded' : 'rank ' + rank}</White>
      !
    </>
  );
}

export function MaxLevelTooltipPane() {
  return (
    <>
      This planet is <White>Level 9</White>, making it one of the <br />
      most powerful planets in the galaxy!
    </>
  );
}

export function SilverProdTooltipPane() {
  return (
    <>
      This planet produces <White>Silver</White>! Use it to buy upgrades!
    </>
  );
}

export function SelectedSilverTooltipPane() {
  const uiManager = useUIManager();
  const selected = useSelectedPlanet(uiManager);

  return (
    <>
      {selected.value ? (
        <>
          <>
            Silver:
            <span>{selected.value.silver}</span>
          </>
          <>
            Cap:
            <span>{selected.value.silverCap}</span>
          </>
          {selected.value.planetType === PlanetType.SILVER_MINE ? (
            <>
              Growth:
              <span>{selected.value.silverGrowth * 60}</span>
            </>
          ) : (
            <>
              <Red>This planet does not produce silver.</Red>
            </>
          )}
        </>
      ) : (
        <>Select a planet to view more about its stats. </>
      )}
    </>
  );
}

export function RangeTooltipPane() {
  return (
    <>
      <White>Range:</White> how far you can send your forces. <White>Forces decay</White> the
      farther out you send them. <br />
      Higher range means that you can send forces the same distance with less decay.
    </>
  );
}

export function MinEnergyTooltipPane() {
  return (
    <>
      The minimum energy you need to send a move from this planet. <br />
      Moves incur a base cost of 5% of the planet's <White>Energy Cap</White>.
    </>
  );
}

export function Time50TooltipPane() {
  return (
    <>
      Time to <White>50%</White> of full energy.
    </>
  );
}

export function Time90TooltipPane() {
  return (
    <>
      Time to <White>90%</White> of full energy. Since energy grows on an s-curve, energy growth
      slows drastically by this point.
    </>
  );
}

export function EnergyGrowthTooltipPane() {
  return (
    <>
      <White>Energy Growth:</White> the maximum growth rate of this planet's energy representing the
      rate at the middle of the <White>s-curve</White>.
    </>
  );
}

export function SilverGrowthTooltipPane() {
  return (
    <>
      <White>Silver Growth</White>: the per-minute linear growth rate of this planet's silver.
    </>
  );
}

export function SilverCapTooltipPane() {
  return (
    <>
      <White>Silver Cap</White>: the maximum silver that this planet can hold.
    </>
  );
}

export function PiratesTooltipPane() {
  return (
    <>
      <Red>This planet has space pirates!</Red> Move energy to unoccupied planets to conquer them!
    </>
  );
}

export function UpgradesTooltipPane() {
  return (
    <>
      <White>Planet Rank</White>: the number of times you've upgraded your planet.
    </>
  );
}

export function ModalHelpTooltipPane() {
  return <>View patch notes and instructions</>;
}

export function ModalPlanetDetailsTooltipPane() {
  return <>View detailed information about the selected planet</>;
}

export function ModalLeaderboardTooltipPane() {
  return <>View the top players, and their top planets</>;
}

export function ModalPlanetDexTooltipPane() {
  return <>View a list of your planets</>;
}

export function ModalUpgradeDetailsTooltipPane() {
  return <>Upgrade the selected planet</>;
}

export function ModalTwitterVerificationTooltipPane() {
  return <>Connect your address to Twitter</>;
}

export function ModalBroadcastTooltipPane() {
  return <>Broadcast the selected planet's coordinates to the world</>;
}

export function BonusEnergyCapTooltipPane() {
  return (
    <>
      <Green>
        This planet's <White>Energy Cap</White> has been randomly doubled!
      </Green>
    </>
  );
}

export function BonusEnergyGroTooltipPane() {
  return (
    <>
      <Green>
        This planet's <White>Energy Growth</White> has been randomly doubled!
      </Green>
    </>
  );
}

export function BonusRangeTooltipPane() {
  return (
    <>
      <Green>
        This planet's <White>Range</White> has been randomly doubled!
      </Green>
    </>
  );
}

export function BonusSpeedTooltipPane() {
  return (
    <>
      <Green>
        This planet's <White>Speed</White> has been randomly doubled!
      </Green>
    </>
  );
}

export function BonusDefenseTooltipPane() {
  return (
    <>
      <Green>
        This planet's <White>Defense</White> has been randomly doubled!
      </Green>
    </>
  );
}

export function BonusSpaceJunkTooltipPane() {
  return (
    <>
      <Green>
        This planet's <White>Space Junk</White> has been randomly halved!
      </Green>
    </>
  );
}

export function ClowntownTooltipPane() {
  const uiManager = useUIManager();
  const selected = useSelectedPlanet(uiManager);
  const account = useAccount(uiManager);

  return (
    <>
      <span>
        {selected.value?.owner === account
          ? `You are the proud mayor of Clown Town!`
          : `It's a town of clowns...`}
      </span>
    </>
  );
}

function DefenseTooltipPane() {
  return (
    <>
      <White>Defense:</White> Planets with higher defense will negate incoming damage. Planets with
      lower than 100 defense are vulnerable and will take more damage!
    </>
  );
}

function SpaceJunkTooltipPane() {
  return (
    <>
      <White>Space Junk:</White> Planets are all filled with junk! Sending energy to a planet with
      junk will remove the junk from that planet and add it to your total junk. Once you reach your
      junk limit, you will not be able to capture planets that have junk. Abandoning planets will
      reduce your space junk and place it back on the planet.
    </>
  );
}

function AbandonTooltipPane() {
  const uiManager = useUIManager();
  const abandonSpeedBoost = uiManager.getAbandonSpeedChangePercent() / 100;
  const abandonRangeBoost = uiManager.getAbandonRangeChangePercent() / 100;

  return (
    <>
      <Red>Abandon your planet:</Red> Give up ownership of this planet to dump some of your space
      junk here. This triggers a special movement that sends full <White>Energy/Silver</White> and
      gives a <Green>Range boost of {abandonRangeBoost}x</Green> and a{' '}
      <Green>Speed boost of {abandonSpeedBoost}x</Green>.
      <br />
      <Red>You cannot abandon your home planet, or a planet that has incoming voyages.</Red>
    </>
  );
}

function SpeedTooltipPane() {
  return (
    <>
      <White>Speed:</White> The rate at which energy travels across the universe, the faster the
      better!
    </>
  );
}

function RetryTransactionPane() {
  return <>Retry transaction.</>;
}

function CancelTransactionPane() {
  return <>Cancel transaction.</>;
}

function PrioritizeTransactionPane() {
  return <>Prioritize transaction.</>;
}

function ArtifactBuffPane() {
  return <>A powerful artifact on this planet is influencing this stat!</>;
}

function PluginsTooltipPane() {
  return <>Manage plugins, which allow you to add functionality to the client.</>;
}

function SettingsPane() {
  return <>Manage settings - export SKEY, manage maps, and more.</>;
}

function YourArtifacts() {
  return <>View your artifacts.</>;
}

function InvadablePane() {
  return <>This planet is in a scoring zone and can be invaded</>;
}

function CapturablePane() {
  return <>This planet has been invaded, which means you can capture it for score.</>;
}

const ModalWithdrawSilverTooltipPane = () => <>Withdraw silver to earn score.</>;

const Hats = () => <>Buy hats for the selected planet.</>;

const FindArtifact = () => (
  <>
    <Green>This planet has a powerful artifact hidden somewhere!</Green> Maybe you could find it...
  </>
);

const ArtifactStored = () => <>This planet has a powerful artifact on it!</>;

const HashesPerSec = () => <>hashes / sec</>;

export function TooltipContent({ name }: { name: TooltipName | undefined }) {
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
  if (name === TooltipName.BonusSpaceJunk) return <BonusSpaceJunkTooltipPane />;
  if (name === TooltipName.Clowntown) return <ClowntownTooltipPane />;
  if (name === TooltipName.ModalHelp) return <ModalHelpTooltipPane />;
  if (name === TooltipName.ModalPlanetDetails) return <ModalPlanetDetailsTooltipPane />;
  if (name === TooltipName.ModalLeaderboard) return <ModalLeaderboardTooltipPane />;
  if (name === TooltipName.ModalPlanetDex) return <ModalPlanetDexTooltipPane />;
  if (name === TooltipName.ModalUpgradeDetails) return <ModalUpgradeDetailsTooltipPane />;
  if (name === TooltipName.ModalTwitterVerification) return <ModalTwitterVerificationTooltipPane />;
  if (name === TooltipName.ModalTwitterBroadcast) return <ModalBroadcastTooltipPane />;
  if (name === TooltipName.Defense) return <DefenseTooltipPane />;
  if (name === TooltipName.SpaceJunk) return <SpaceJunkTooltipPane />;
  if (name === TooltipName.Abandon) return <AbandonTooltipPane />;
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
  if (name === TooltipName.TimeUntilActivationPossible) return <TimeUntilActivationPossiblePane />;
  if (name === TooltipName.DepositArtifact) return <DepositArtifactPane />;
  if (name === TooltipName.DeactivateArtifact) return <DeactivateArtifactPane />;
  if (name === TooltipName.WithdrawArtifact) return <WithdrawArtifactPane />;
  if (name === TooltipName.ActivateArtifact) return <ActivateArtifactPane />;
  if (name === TooltipName.DefenseMultiplier) return <DefenseMultiplierPane />;
  if (name === TooltipName.EnergyCapMultiplier) return <EnergyCapMultiplierPane />;
  if (name === TooltipName.EnergyGrowthMultiplier) return <EnergyGrowthMultiplierPane />;
  if (name === TooltipName.RangeMultiplier) return <RangeMultiplierPane />;
  if (name === TooltipName.SpeedMultiplier) return <SpeedMultiplierPane />;
  if (name === TooltipName.NetworkHealth) return <NetworkHealthPane />;
  if (name === TooltipName.WithdrawSilverButton) return <WithdrawSilverButton />;
  if (name === TooltipName.RetryTransaction) return <RetryTransactionPane />;
  if (name === TooltipName.CancelTransaction) return <CancelTransactionPane />;
  if (name === TooltipName.PrioritizeTransaction) return <PrioritizeTransactionPane />;
  if (name === TooltipName.Invadable) return <InvadablePane />;
  if (name === TooltipName.Capturable) return <CapturablePane />;
  return <></>;
}
