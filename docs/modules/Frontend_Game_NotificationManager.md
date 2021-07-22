# Module: Frontend/Game/NotificationManager

## Table of contents

### Enumerations

- [NotificationManagerEvent](../enums/Frontend_Game_NotificationManager.NotificationManagerEvent.md)
- [NotificationType](../enums/Frontend_Game_NotificationManager.NotificationType.md)

### Classes

- [default](../classes/Frontend_Game_NotificationManager.default.md)

### Type aliases

- [NotificationInfo](Frontend_Game_NotificationManager.md#notificationinfo)

## Type aliases

### NotificationInfo

Ƭ **NotificationInfo**: `Object`

#### Type declaration

| Name        | Type                                                                                 |
| :---------- | :----------------------------------------------------------------------------------- |
| `color?`    | `string`                                                                             |
| `icon`      | `React.ReactNode`                                                                    |
| `id`        | `string`                                                                             |
| `message`   | `React.ReactNode`                                                                    |
| `txData?`   | `TxIntent`                                                                           |
| `txStatus?` | `EthTxStatus`                                                                        |
| `type`      | [`NotificationType`](../enums/Frontend_Game_NotificationManager.NotificationType.md) |
