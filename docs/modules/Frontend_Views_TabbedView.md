# Module: Frontend/Views/TabbedView

## Table of contents

### Functions

- [TabbedView](Frontend_Views_TabbedView.md#tabbedview)

## Functions

### TabbedView

▸ **TabbedView**(`__namedParameters`): `Element`

This component allows you to render several tabs of content. Each tab can be selected for viewing
by clicking on its corresponding tab button. Useful for displaying lots of slightly different but
related information to the user.

#### Parameters

| Name                            | Type                                  |
| :------------------------------ | :------------------------------------ |
| `__namedParameters`             | `Object`                              |
| `__namedParameters.style?`      | `CSSProperties`                       |
| `__namedParameters.tabTitles`   | `string`[]                            |
| `__namedParameters.tabContents` | (`tabIndex`: `number`) => `ReactNode` |

#### Returns

`Element`
