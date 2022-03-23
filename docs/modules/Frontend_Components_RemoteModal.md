# Module: Frontend/Components/RemoteModal

## Table of contents

### Functions

- [RemoteModal](Frontend_Components_RemoteModal.md#remotemodal)

## Functions

### RemoteModal

▸ **RemoteModal**(`__namedParameters`): `ReactPortal`

Allows you to instantiate a modal, and render it into the desired element.
Useful for loading temporary modals from ANYWHERE in the UI, not just
[GameWindowLayout](Frontend_Views_GameWindowLayout.md#gamewindowlayout)

#### Parameters

| Name                | Type                                                                                                                                                         |
| :------------------ | :----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `__namedParameters` | `PropsWithChildren`<{ `container`: `Element` ; `id`: `ModalId` ; `title`: `string` ; `visible`: `boolean` ; `width?`: `string` ; `onClose`: () => `void` }\> |

#### Returns

`ReactPortal`
