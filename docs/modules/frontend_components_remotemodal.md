# Module: Frontend/Components/RemoteModal

## Table of contents

### Functions

- [RemoteModal](frontend_components_remotemodal.md#remotemodal)

## Functions

### RemoteModal

▸ **RemoteModal**(`__namedParameters`: { `children`: React.ReactElement ; `container`: Element ; `hook`: [*boolean*, (`set`: *boolean*) => *void*] ; `title`: _string_ }): _ReactPortal_

Allows you to instantiate a modal, and render it into the desired element.
Useful for loading temporary modals from ANYWHERE in the UI, not just
[GameWindowLayout](frontend_views_gamewindowlayout.md#gamewindowlayout)

#### Parameters

| Name                          | Type                                      |
| :---------------------------- | :---------------------------------------- |
| `__namedParameters`           | _object_                                  |
| `__namedParameters.children`  | React.ReactElement                        |
| `__namedParameters.container` | Element                                   |
| `__namedParameters.hook`      | [*boolean*, (`set`: *boolean*) => *void*] |
| `__namedParameters.title`     | _string_                                  |

**Returns:** _ReactPortal_
