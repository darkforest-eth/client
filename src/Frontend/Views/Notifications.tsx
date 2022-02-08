import { ContractMethodName } from '@darkforest_eth/types';
import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import NotificationManager, {
  NotificationInfo,
  NotificationsDictionaryItem,
  NotificationsDictionary,
  NotificationManagerEvent,
  NotificationType,
} from '../Game/NotificationManager';
import dfstyles from '../Styles/dfstyles';
import { useUIManager } from '../Utils/AppHooks';
import { GameWindowZIndex } from '../Utils/constants';
import { Setting } from '../Utils/SettingsHooks';

/**
 * React component which represents a single notification. Can be hovered over for more info, or
 * clicked on to dismiss.
 */
function Notification({
  dictionary,
  item,
  index,
  onClick,
  style,
}: {
  dictionary: NotificationsDictionary,
  item: NotificationsDictionaryItem;
  index: number;
  onClick: () => void;
  style?: React.CSSProperties;
}) {
  const { notifications, color, icon } = item;
  const [showing, setShowing] = useState<boolean>(false);
  const [notificationsTopPosition, setNotificationsTopPosition] = useState(0.5);
  
  useEffect(() => {
    const notificationsTopPosition = (index + 1) > notifications.length ?
      (NOTIF_SIZE + MARGIN) * ((index + 1) - notifications.length) + 0.5 : 0.5;

    setNotificationsTopPosition(notificationsTopPosition);
  }, [dictionary, index, notifications]);

  return (
    <StyledNotification onMouseLeave={() => setShowing(false)}>
      <NotificationIconContainer
        onMouseEnter={() => setShowing(true)}
        onClick={onClick}
        style={{ ...style, background: color }}
      >
        {icon}
        <NotificationsCounter>
          {notifications.length}
        </NotificationsCounter>
      </NotificationIconContainer>
      {
        <NotificationsContentWrapper height={notifications.length * (NOTIF_SIZE + MARGIN)} top={notificationsTopPosition}>
          { showing &&
              notifications.map(notification => (
                <NotificationContent key={notification.id}>{ notification.message }</NotificationContent>
              ))
          }
        </NotificationsContentWrapper>
      }
    </StyledNotification>
  );
}

/**
 * React component in charge of listening for new notifications and displaying them interactively to
 * the user.
 */
export function NotificationsPane() {
  const [notifs, setNotifs] = useState<NotificationsDictionary>({});

  const uiManager = useUIManager();

  // listen for new notifs
  useEffect(() => {
    const notifManager = NotificationManager.getInstance();

    const addNotif = (notif: NotificationInfo) => {
      const notifMove = uiManager.getBooleanSetting(Setting.MoveNotifications);

      if (
        !notifMove &&
        notif.type === NotificationType.Tx &&
        notif.txData?.methodName === ContractMethodName.MOVE
      ) {
        return;
      }

      setNotifs((notificationsDictionary) => {
        const notificationsDictionaryCopy = _.clone(notificationsDictionary);
        const currentKeys = Object.keys(notificationsDictionaryCopy);
        const dictionaryKey: string = `${notif.type}${notif.txStatus ?? ''}`;
        const isKeyAlreadyExists = currentKeys.includes(dictionaryKey);

        if (!Boolean(currentKeys.length) || !isKeyAlreadyExists) {
          notificationsDictionaryCopy[dictionaryKey] = {
            notifications: [],
            color: notif.color,
            icon: notif.icon,
            order: currentKeys.length + 1
          };
        }

        notificationsDictionaryCopy[dictionaryKey].notifications.push(notif);

        return notificationsDictionaryCopy;
      });
    };

    const clearNotif = (id: string) => {
      setNotifs((dictionary) => {
        const filteredDictionatyEntries = Object.entries(dictionary)
          .filter(([, item]) => item.notifications.filter((n) => n.id !== id));

        return Object.fromEntries(filteredDictionatyEntries);
      });
    };

    notifManager.on(NotificationManagerEvent.ClearNotification, clearNotif);
    notifManager.on(NotificationManagerEvent.Notify, addNotif);

    return () => {
      notifManager.removeListener(NotificationManagerEvent.ClearNotification, clearNotif);
      notifManager.removeListener(NotificationManagerEvent.Notify, addNotif);
    };
  }, [uiManager]);

  // creates a callback for a notif which removes itself
  const getRemove = (key: string): (() => void) => {
    return (): void => {
      const dictionaryCopy = _.clone(notifs);

      delete dictionaryCopy[key];

      setNotifs(dictionaryCopy);
    };
  };

  return (
    <NotificationsContainer>
      {
        Object.entries(notifs).sort(([,a],[,b]) => a.order - b.order).map(([key, dictionaryItem], index) => (
          <Notification
              dictionary={notifs}
              item={dictionaryItem}
              index={index}
              key={key}
              onClick={getRemove(key)}
              style={{ opacity: 1 - (index - 2) * 0.13 }}
            />
          )
        )
      }
    </NotificationsContainer>
  );
}

const NOTIF_SIZE = 4;
const MARGIN = 0.5;

const StyledNotification = styled.div`
  margin: ${MARGIN}em;
  display: flex;
  flex-direction: row-reverse;
  justify-content: flex-start;
  &:hover {
    z-index: ${GameWindowZIndex.Tooltip};
  }
`;

/**
 * Element which contains the notification-dependent icon. User can hover over this to display more
 * info about the notification.
 */
const NotificationIconContainer = styled.div`
  position: relative;
  width: ${NOTIF_SIZE}em;
  height: ${NOTIF_SIZE}em;
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
  margin-bottom: ${MARGIN}em;
  min-height: ${NOTIF_SIZE}em;
  height: ${NOTIF_SIZE}em;
  min-width: 3em;
  max-width: 50em;
  overflow: scroll;
  margin-right: ${MARGIN}em;
  background: ${dfstyles.colors.background};
  padding: 0.5em 1em;
  border-radius: 2px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  z-index: ${GameWindowZIndex.Tooltip};
`;

/**
 * The element which contains all the notifications
 */
const NotificationsContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  z-index: ${GameWindowZIndex.Notification};
`;

/**
 * The element which contains counter specific notifications
 */
const NotificationsCounter = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  padding: 0 2px;
  color: #ffffff;
  border-radius: 0 25%;
  background-color: #2d8bb9;
`;

/**
 * The element which wraps specific notifications tooltip
 */
 const NotificationsContentWrapper = styled.div`
  position: fixed;
  right: ${NOTIF_SIZE + MARGIN}em;
  bottom: 0.5em;
  display: flex;
  flex-direction: column;
  ${({ height, top }: { height: number; top: number }) => css`
    height: ${height}em;
    top: ${top}em
  `};
  max-height: calc(100vh - 1em);
  overflow-y: auto;
`;
