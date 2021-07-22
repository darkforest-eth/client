import _ from 'lodash';
import React, { useState, useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { EthTxStatus, EthTxType } from '@darkforest_eth/types';
import NotificationManager, {
  NotificationInfo,
  NotificationType,
  NotificationManagerEvent,
} from '../Game/NotificationManager';
import dfstyles from '../Styles/dfstyles';
import { useUIManager } from '../Utils/AppHooks';
import { Setting } from '../Utils/SettingsHooks';

const NOTIF_SIZE = '4em';
const MARGIN = '8px';
const fadeBrightness = keyframes`
  from {
    filter: brightness(0.8);
  }
  to {
    filter: brightness(1.2);
  }
`;

const animation = css`
  animation: ${fadeBrightness} 1s ${dfstyles.game.styles.animProps};
`;

const StyledNotification = styled.div`
  margin: ${MARGIN};
  display: flex;
  flex-direction: row-reverse;
  justify-content: flex-start;

  & > div.n-icon {
    width: ${NOTIF_SIZE};
    height: ${NOTIF_SIZE};
    border-radius: 8px;
    border: 1px solid ${dfstyles.colors.text};
    background: ${({ color }) => color || dfstyles.colors.backgroundlighter};
    overflow: hidden;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;

    & > span {
      font-size: 2em;
    }

    ${animation};
  }

  & > div.n-info {
    height: ${NOTIF_SIZE};
    min-width: 3em;
    max-width: 50em;
    overflow: scroll;
    margin-right: ${MARGIN};
    background: ${dfstyles.colors.background};
    padding: 0.5em 1em;
    border-radius: 2px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
  }
`;

function Notification({
  notif,
  removeSelf,
  style,
}: {
  notif: NotificationInfo;
  removeSelf: () => void;
  style?: React.CSSProperties;
}) {
  const [showing, setShowing] = useState<boolean>(false);

  const { message, icon } = notif;

  return (
    <StyledNotification onMouseLeave={() => setShowing(false)}>
      <div
        className='n-icon'
        onMouseEnter={() => setShowing(true)}
        onClick={removeSelf}
        style={{ ...style, background: notif.color }}
      >
        {icon}
      </div>
      {showing && <div className='n-info'>{message}</div>}
    </StyledNotification>
  );
}

const StyledNotificationsPane = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  z-index: 100;
`;

export function NotificationsPane() {
  const [notifs, setNotifs] = useState<Array<NotificationInfo>>([]);

  const uiManager = useUIManager();

  // listen for new notifs
  useEffect(() => {
    const notifManager = NotificationManager.getInstance();

    const addNotif = (notif: NotificationInfo) => {
      const notifMove = uiManager.getBooleanSetting(Setting.MoveNotifications);

      if (!notifMove && notif.type === NotificationType.Tx && notif.txData?.type === EthTxType.MOVE)
        return;

      setNotifs((arr) => {
        const newArr = _.clone(arr);
        for (let i = 0; i < arr.length; i++) {
          if (arr[i].id === notif.id) {
            if (notif.txStatus === EthTxStatus.Confirm) newArr.splice(i, 1);
            else newArr[i] = notif;
            return newArr;
          }
        }

        return newArr.concat([notif]);
      });
    };

    notifManager.on(NotificationManagerEvent.Notify, addNotif);

    return () => {
      notifManager.removeListener(NotificationManagerEvent.Notify, addNotif);
    };
  }, [uiManager]);

  // creates a callback for a notif which removes itself
  const getRemove = (notif: NotificationInfo): (() => void) => {
    return (): void => {
      const copy = _.clone(notifs);
      for (let i = 0; i < copy.length; i++) {
        if (copy[i].id === notif.id) copy.splice(i, 1);
      }
      setNotifs(copy);
    };
  };

  return (
    <StyledNotificationsPane>
      {notifs.slice(0, Math.min(10, notifs.length)).map((el, i) => (
        <Notification
          notif={el}
          key={el.id}
          removeSelf={getRemove(el)}
          style={{ opacity: 1 - (i - 2) * 0.13 }}
        />
      ))}
    </StyledNotificationsPane>
  );
}
