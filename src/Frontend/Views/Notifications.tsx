import { Setting } from '@darkforest_eth/types';
import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import NotificationManager, {
  NotificationInfo,
  NotificationManagerEvent,
  NotificationType,
} from '../Game/NotificationManager';
import dfstyles, { snips } from '../Styles/dfstyles';
import { useUIManager } from '../Utils/AppHooks';
import { DFZIndex } from '../Utils/constants';

/**
 * React component which represents a single notification. Can be hovered over for more info, or
 * clicked on to dismiss.
 */
function Notification({
  notif,
  onClick,
  style,
}: {
  notif: NotificationInfo;
  onClick: () => void;
  style?: React.CSSProperties;
}) {
  const { message, icon } = notif;
  const [showing, setShowing] = useState<boolean>(false);

  return (
    <StyledNotification onMouseLeave={() => setShowing(false)}>
      <NotificationIconContainer
        onMouseEnter={() => setShowing(true)}
        onClick={onClick}
        style={{ ...style, background: notif.color }}
      >
        {icon}
      </NotificationIconContainer>
      {showing && <NotificationContent>{message}</NotificationContent>}
    </StyledNotification>
  );
}

/**
 * React component in charge of listening for new notifications and displaying them interactively to
 * the user.
 */
export function NotificationsPane() {
  const [notifs, setNotifs] = useState<Array<NotificationInfo>>([]);

  const uiManager = useUIManager();

  // listen for new notifs
  useEffect(() => {
    const notifManager = NotificationManager.getInstance();

    const addNotif = (notif: NotificationInfo) => {
      const notifMove = uiManager.getBooleanSetting(Setting.MoveNotifications);

      if (!notifMove && notif.type === NotificationType.Tx && notif.txData?.methodName === 'move')
        return;

      setNotifs((arr) => {
        const newArr = _.clone(arr);
        for (let i = 0; i < arr.length; i++) {
          if (arr[i].id === notif.id) {
            newArr[i] = notif;
            return newArr;
          }
        }

        return newArr.concat([notif]);
      });
    };

    const clearNotif = (id: string) => {
      setNotifs((arr) => arr.filter((n) => n.id !== id));
    };

    notifManager.on(NotificationManagerEvent.ClearNotification, clearNotif);
    notifManager.on(NotificationManagerEvent.Notify, addNotif);

    return () => {
      notifManager.removeListener(NotificationManagerEvent.ClearNotification, clearNotif);
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
    <NotificationsContainer>
      {notifs.slice(0, Math.min(10, notifs.length)).map((el, i) => (
        <Notification
          notif={el}
          key={el.id}
          onClick={getRemove(el)}
          style={{ opacity: 1 - (i - 2) * 0.13 }}
        />
      ))}
    </NotificationsContainer>
  );
}

const NOTIF_SIZE = '4em';
const MARGIN = '8px';

const StyledNotification = styled.div`
  margin: ${MARGIN};
  display: flex;
  flex-direction: row-reverse;
  justify-content: flex-start;
  &:hover {
    z-index: ${DFZIndex.Tooltip};
  }
`;

/**
 * Element which contains the notification-dependent icon. User can hover over this to display more
 * info about the notification.
 */
const NotificationIconContainer = styled.div`
  width: ${NOTIF_SIZE};
  height: ${NOTIF_SIZE};
  border-radius: 8px;
  border: 1px solid ${dfstyles.colors.text};
  background: ${({ color }) => color || dfstyles.colors.backgroundlighter};
  overflow: hidden;
  display: flex;
  flex-grow: 0;
  flex-shrink: 0;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

/**
 * Element which contains the information which is attached to the notification. Only shown for a
 * notification if the user is hovering over the notification's {@link NotificationIconContainer}.
 */
const NotificationContent = styled.div`
  border-radius: ${snips.roundedBordersWithEdge};
  min-height: ${NOTIF_SIZE};
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
  z-index: ${DFZIndex.Tooltip};
`;

/**
 * The element which contains all the notifications
 */
const NotificationsContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  z-index: ${DFZIndex.Notification};
`;
