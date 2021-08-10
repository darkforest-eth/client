import { PLANET_CLAIM_MIN_LEVEL } from '@darkforest_eth/constants';
import { LocationId } from '@darkforest_eth/types';
import React from 'react';
import { isLocatable } from '../../_types/global/GlobalTypes';
import { Btn } from '../Components/Btn';
import { EmSpacer, PaddedRecommendedModalWidth } from '../Components/CoreUI';
import { AccountLabel } from '../Components/Labels/Labels';
import { MythicLabelText } from '../Components/Labels/MythicLabel';
import { LoadingSpinner } from '../Components/LoadingSpinner';
import {
  usePlanet,
  usePlayer,
  usePopAllOnSelectedPlanetChanged,
  useUIManager,
} from '../Utils/AppHooks';
import { ModalHandle } from '../Views/ModalPane';

export function ClaimPlanetPane({
  planetId,
  modal,
}: {
  modal: ModalHandle;
  planetId?: LocationId;
}) {
  usePopAllOnSelectedPlanetChanged(modal, planetId);
  const uiManager = useUIManager();
  const gameManager = uiManager.getGameManager();
  const planetWrapper = usePlanet(uiManager, planetId);
  const planet = planetWrapper.value;
  const player = usePlayer(uiManager);

  if (!planetId || !planet || !isLocatable(planet) || !player.value) return null;

  const center = { x: 0, y: 0 };
  const distanceFromCenter = Math.floor(gameManager.getDistCoords(planet.location.coords, center));
  const currentPlayerScore = player.value.score || 0;
  const isClaimingNow =
    !!planet?.unconfirmedClaim || !!gameManager.getGameObjects().getUnconfirmedClaim();
  const isClaimingThisPlanetNow = !!planet?.unconfirmedClaim;
  const existingClaim = gameManager.getClaimedLocations().get(planetId);
  const claimedByThisPlayer =
    (!!existingClaim && existingClaim.revealer === player.value?.address) ||
    (planet.claimer === player.value?.address && !!planet.claimer);
  const claimedByOtherPlayer = !!existingClaim && existingClaim.revealer !== player.value?.address;
  const planetIsLargeEnough = planet.planetLevel >= PLANET_CLAIM_MIN_LEVEL;
  const disableClaimButton = !planetIsLargeEnough || claimedByThisPlayer || isClaimingNow;
  const isCloserThanPlayersCurrentClosest = currentPlayerScore > distanceFromCenter;

  let description = <></>;
  let claimButtonContent = <></>;

  if (planet.planetLevel < PLANET_CLAIM_MIN_LEVEL) {
    description = (
      <>
        Unfortunately, you cannot claim it planet because it is below level {PLANET_CLAIM_MIN_LEVEL}
        . Find a bigger planet to claim!
      </>
    );
  } else if (claimedByOtherPlayer && existingClaim) {
    description = (
      <>
        This planet is claimed by <AccountLabel ethAddress={existingClaim.revealer} />! You can
        claim it for yourself, making it count towards your score, and not theirs.
      </>
    );
  } else if (claimedByThisPlayer) {
    description = <>You've claimed this planet!</>;
  } else if (currentPlayerScore === 0) {
    description = (
      <>You haven't claimed a planet yet. Claiming this planet gets you on the board!</>
    );
  } else {
    description = (
      <>
        Your current closest planet is{' '}
        <MythicLabelText text={currentPlayerScore.toLocaleString()} /> away from the center. This
        planet is {isCloserThanPlayersCurrentClosest ? 'closer' : 'further'} away from the center
        than your closet planet.
        {isCloserThanPlayersCurrentClosest && ' Claim it to move up on the leaderboard!'}
      </>
    );
  }

  if (planet.planetLevel < PLANET_CLAIM_MIN_LEVEL) {
    claimButtonContent = <>Too Small</>;
  } else if (isClaimingNow && !isClaimingThisPlanetNow) {
    claimButtonContent = <>Claiming Other Planet</>;
  } else if (isClaimingNow) {
    claimButtonContent = <LoadingSpinner initialText={'Claiming...'} />;
  } else {
    claimButtonContent = <>Claim Planet</>;
  }

  if (claimedByOtherPlayer && existingClaim) {
  }

  return (
    <PaddedRecommendedModalWidth>
      This planet is <MythicLabelText text={distanceFromCenter.toLocaleString()} /> away from the
      center!
      <EmSpacer height={1} />
      {description}
      <EmSpacer height={1} />
      <Btn disabled={disableClaimButton} onClick={() => gameManager.claimLocation(planetId)}>
        {claimButtonContent}
      </Btn>
    </PaddedRecommendedModalWidth>
  );
}
