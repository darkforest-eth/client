import React, {
  useState,
  useRef,
  useEffect,
  useLayoutEffect,
  useCallback,
} from 'react';
import styled from 'styled-components';
import dfstyles from '../../styles/dfstyles';
import WindowManager, { TooltipName } from '../../utils/WindowManager';
import { PaneProps } from '../GameWindowComponents/GameWindowComponents';
import { GameWindowZIndex } from '../GameWindow';
import {
  HelpIcon,
  PlanetIcon,
  LeaderboardIcon,
  PlanetdexIcon,
  UpgradeIcon,
  TwitterIcon,
  BroadcastIcon,
  ShareIcon,
  LockIcon,
  HatIcon,
  SettingsIcon,
} from '../Icons';
import { TooltipTrigger } from './Tooltip';

export const IconButton = styled.div<{ width?: string }>`
  width: ${(props) => props.width || '1.5em'};
  height: 1.5em;
  display: inline-flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;

  border-radius: 2px;
  border: 1px solid ${dfstyles.colors.text};

  transition: color 0.2s, background 0.2s;

  &:hover,
  &.active {
    background: ${dfstyles.colors.text};
    color: ${dfstyles.colors.background};
    & svg path {
      fill: ${dfstyles.colors.background};
    }
    cursor: pointer;
  }

  &:active {
    ${dfstyles.game.styles.active};
  }
`;

type ModalIconStateFn = (arg: ((b: boolean) => boolean) | boolean) => void;

export type ModalHook = [boolean, ModalIconStateFn];

export enum ModalName {
  Help,
  PlanetDetails,
  Leaderboard,
  PlanetDex,
  UpgradeDetails,
  TwitterVerify,
  TwitterBroadcast,
  MapShare,
  ManageAccount,
  Hats,
  Settings,
  Onboarding,
  Private,
}

export function ModalIcon({
  modal,
  hook: [active, setActive],
}: {
  modal: ModalName;
  hook: ModalHook;
}) {
  const child = (): React.ReactNode => {
    if (modal === ModalName.Help) return <HelpIcon />;
    else if (modal === ModalName.PlanetDetails) return <PlanetIcon />;
    else if (modal === ModalName.Leaderboard) return <LeaderboardIcon />;
    else if (modal === ModalName.PlanetDex) return <PlanetdexIcon />;
    else if (modal === ModalName.UpgradeDetails) return <UpgradeIcon />;
    else if (modal === ModalName.TwitterVerify) return <TwitterIcon />;
    else if (modal === ModalName.TwitterBroadcast) return <BroadcastIcon />;
    else if (modal === ModalName.MapShare) return <ShareIcon />;
    else if (modal === ModalName.ManageAccount) return <LockIcon />;
    else if (modal === ModalName.Hats) return <HatIcon />;
    else if (modal === ModalName.Settings) return <SettingsIcon />;
    return <span>T</span>;
  };

  return (
    <TooltipTrigger
      name={TooltipName.ModalHelp + modal}
      needsShift={true}
      display='inline-block'
      style={{ height: '1.5em' }}
    >
      <IconButton
        onClick={(e) => {
          setActive((b) => !b);
          e.stopPropagation();
        }}
        className={active ? 'active' : undefined}
      >
        {child()}
      </IconButton>
    </TooltipTrigger>
  );
}

export function ModalHelpIcon({ hook }: { hook: ModalHook }) {
  return <ModalIcon hook={hook} modal={ModalName.Help} />;
}

export function ModalPlanetDetailsIcon({ hook }: { hook: ModalHook }) {
  return <ModalIcon hook={hook} modal={ModalName.PlanetDetails} />;
}

export function ModalLeaderboardIcon({ hook }: { hook: ModalHook }) {
  return <ModalIcon hook={hook} modal={ModalName.Leaderboard} />;
}

export function ModalPlanetDexIcon({ hook }: { hook: ModalHook }) {
  return <ModalIcon hook={hook} modal={ModalName.PlanetDex} />;
}

export function ModalUpgradeDetailsIcon({ hook }: { hook: ModalHook }) {
  return <ModalIcon hook={hook} modal={ModalName.UpgradeDetails} />;
}

export function ModalMapShareIcon({ hook }: { hook: ModalHook }) {
  return <ModalIcon hook={hook} modal={ModalName.MapShare} />;
}

export function ModalTwitterVerifyIcon({ hook }: { hook: ModalHook }) {
  return <ModalIcon hook={hook} modal={ModalName.TwitterVerify} />;
}

export function ModalTwitterBroadcastIcon({ hook }: { hook: ModalHook }) {
  return <ModalIcon hook={hook} modal={ModalName.TwitterBroadcast} />;
}

export function ModalAccountIcon({ hook }: { hook: ModalHook }) {
  return <ModalIcon hook={hook} modal={ModalName.ManageAccount} />;
}

export function ModalHatIcon({ hook }: { hook: ModalHook }) {
  return <ModalIcon hook={hook} modal={ModalName.Hats} />;
}

export function ModalSettingsIcon({ hook }: { hook: ModalHook }) {
  return <ModalIcon hook={hook} modal={ModalName.Settings} />;
}

const StyledModalPane = styled.div`
  position: absolute;
  width: fit-content;
  height: fit-content;
  background: ${dfstyles.colors.background};
  border-radius: 3px;
  border: 1px solid ${dfstyles.colors.text};
  z-index: ${GameWindowZIndex.Modal};

  & > div {
    padding: 0.5em;
  }

  display: flex;
  flex-direction: column;

  & .modal-header {
    width: 100%;
    height: 2.5em;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid ${dfstyles.colors.subtext};

    &:hover {
      background: ${dfstyles.colors.backgroundlight};
    }

    & > p {
      cursor: grab;
    }

    & > span {
      margin-right: 0.2em;
      transition: color 0.2s;

      line-height: 1.5em;

      &: hover {
        color: ${dfstyles.colors.subtext};
        cursor: pointer;
      }
    }
  }
  & .modal-container {
    margin-top: 4pt;
    width: fit-content;
    min-width: 10em;
    height: fit-content;
    min-height: 5em;
  }
`;

export type ModalProps = {
  hook: ModalHook;
  name: ModalName;
};

type Coords = { x: number; y: number };

const clipX = (x, width) => {
  let newX = x;
  if (newX + width > window.innerWidth) {
    newX = window.innerWidth - width;
  } else if (newX < 0) newX = 0;
  return newX;
};

const clipY = (y, height) => {
  let newY = y;
  if (newY + height > window.innerHeight) {
    newY = window.innerHeight - height;
  } else if (newY < 0) newY = 0;
  return newY;
};

export function ModalPane({
  children,
  title,
  hook: [visible, setVisible],
  name: _id,
  fixCorner,
  hideClose,
  style,
}: PaneProps &
  ModalProps & {
    fixCorner?: boolean;
    hideClose?: boolean;
    style?: React.CSSProperties;
  }) {
  const windowManager = WindowManager.getInstance();

  const [coords, setCoords] = useState<Coords | null>(null);
  const [delCoords, setDelCoords] = useState<Coords | null>(null);
  const [mousedownCoords, setMousedownCoords] = useState<Coords | null>(null);

  // TODO clean this up and merge them into one guy?
  const [styleClicking, setStyleClicking] = useState<boolean>(false);
  const [clicking, setClicking] = useState<boolean>(false);

  const [zIndex, setZIndex] = useState<number>(GameWindowZIndex.Modal);
  const push = useCallback(() => setZIndex(windowManager.getIndex()), [
    windowManager,
  ]);

  const containerRef = useRef<HTMLDivElement>(document.createElement('div'));
  const headerRef = useRef<HTMLDivElement>(document.createElement('div'));

  // attach mouse down handler
  useEffect(() => {
    if (!coords) return;

    const myCurrent = headerRef.current;

    const doMouseDown = (e) => {
      setMousedownCoords({ x: e.clientX, y: e.clientY });
      setClicking(true);
    };

    myCurrent.addEventListener('mousedown', doMouseDown);

    return () => {
      myCurrent.removeEventListener('mousedown', doMouseDown);
    };
  }, [coords, containerRef]);

  // attach mousemove handler
  useEffect(() => {
    const doMouseMove = (e) => {
      if (!mousedownCoords) return; // is null, something messed up
      if (!visible || !clicking) return;

      const delX = e.clientX - mousedownCoords.x;
      const delY = e.clientY - mousedownCoords.y;
      setDelCoords({ x: delX, y: delY });
    };

    if (visible && clicking) {
      window.addEventListener('mousemove', doMouseMove);
    }
    return () => {
      window.removeEventListener('mousemove', doMouseMove);
    };
  }, [visible, clicking, mousedownCoords]);

  // attach mouseup handler
  useEffect(() => {
    if (!mousedownCoords || !coords) return;

    const doMouseUp = (e: MouseEvent) => {
      const delX = e.clientX - mousedownCoords.x;
      const delY = e.clientY - mousedownCoords.y;

      const newCoords = {
        x: clipX(coords.x + delX, containerRef.current.offsetWidth),
        y: clipY(coords.y + delY, containerRef.current.offsetHeight),
      };

      setMousedownCoords(null);
      setDelCoords(null);
      setCoords(newCoords);
      setClicking(false);
    };

    if (visible && clicking) {
      window.addEventListener('mouseleave', doMouseUp);
      window.addEventListener('mouseup', doMouseUp);
    }
    return () => {
      window.removeEventListener('mouseup', doMouseUp);
      window.addEventListener('mouseleave', doMouseUp);
    };
  }, [visible, clicking, mousedownCoords, coords]);

  // inits at center
  useLayoutEffect(() => {
    const newX = 0.5 * (window.innerWidth - containerRef.current.offsetWidth);
    const newY = 0.5 * (window.innerHeight - containerRef.current.offsetHeight);
    setCoords({ x: newX, y: newY });
    push();
  }, [containerRef, windowManager, push]);

  // if fixCorner, fix to corner
  useLayoutEffect(() => {
    if (fixCorner) {
      const newX = window.innerWidth - containerRef.current.offsetWidth - 12;
      const newY = window.innerHeight - containerRef.current.offsetHeight - 12;
      setCoords({ x: newX, y: newY });
    }
  }, [fixCorner]);

  // push to top
  useLayoutEffect(() => {
    push();
  }, [visible, windowManager, push]);

  // calculate real values
  const [left, setLeft] = useState<number>(0);
  const [top, setTop] = useState<number>(0);

  useLayoutEffect(() => {
    if (!coords) return;
    const delX = delCoords ? delCoords.x : 0;
    const delY = delCoords ? delCoords.y : 0;

    setLeft(clipX(coords.x + delX, containerRef.current.offsetWidth));
    setTop(clipY(coords.y + delY, containerRef.current.offsetHeight));
  }, [coords, delCoords, containerRef]);

  return (
    <StyledModalPane
      style={{
        left: left + 'px',
        top: top + 'px',
        zIndex: visible ? zIndex : -1000,
        ...style,
      }}
      ref={containerRef}
      onMouseDown={push}
    >
      <div
        ref={headerRef}
        className='modal-header'
        style={{ cursor: styleClicking ? 'grabbing' : 'grab' }}
        // need these to prevent highlight shenanigans
        onMouseLeave={(_e) => {
          setStyleClicking(false);
        }}
        onClick={(e) => e.preventDefault()}
        onMouseUp={(e) => {
          e.preventDefault();
          setStyleClicking(false);
        }}
        onMouseDown={(e) => {
          e.preventDefault();
          setStyleClicking(true);
        }}
      >
        <p>
          <u>{title}</u>
        </p>
        {!hideClose && <span onClick={() => setVisible(false)}>X</span>}
      </div>
      <div className='modal-container'>{children}</div>
    </StyledModalPane>
  );
}
