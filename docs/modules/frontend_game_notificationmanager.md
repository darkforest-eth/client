# Module: Frontend/Game/NotificationManager

## Table of contents

### Enumerations

- [NotificationManagerEvent](../enums/frontend_game_notificationmanager.notificationmanagerevent.md)
- [NotificationType](../enums/frontend_game_notificationmanager.notificationtype.md)

### Classes

- [default](../classes/frontend_game_notificationmanager.default.md)

### Type aliases

- [NotificationInfo](frontend_game_notificationmanager.md#notificationinfo)

## Type aliases

### NotificationInfo

Ƭ **NotificationInfo**: _object_

#### Type declaration

| Name        | Type                                                                                 |
| :---------- | :----------------------------------------------------------------------------------- |
| `color?`    | _string_                                                                             |
| `icon`      | React.ReactNode                                                                      |
| `id`        | _string_                                                                             |
| `message`   | React.ReactNode                                                                      |
| `txData?`   | TxIntent                                                                             |
| `txStatus?` | EthTxStatus                                                                          |
| `type`      | [_NotificationType_](../enums/frontend_game_notificationmanager.notificationtype.md) |
