# Interface: TerminalHandle

[Frontend/Views/Terminal](../modules/frontend_views_terminal.md).TerminalHandle

## Table of contents

### Properties

- [clear](frontend_views_terminal.terminalhandle.md#clear)
- [focus](frontend_views_terminal.terminalhandle.md#focus)
- [getInput](frontend_views_terminal.terminalhandle.md#getinput)
- [newline](frontend_views_terminal.terminalhandle.md#newline)
- [print](frontend_views_terminal.terminalhandle.md#print)
- [printElement](frontend_views_terminal.terminalhandle.md#printelement)
- [printLink](frontend_views_terminal.terminalhandle.md#printlink)
- [printLoadingBar](frontend_views_terminal.terminalhandle.md#printloadingbar)
- [printLoadingSpinner](frontend_views_terminal.terminalhandle.md#printloadingspinner)
- [printShellLn](frontend_views_terminal.terminalhandle.md#printshellln)
- [println](frontend_views_terminal.terminalhandle.md#println)
- [removeLast](frontend_views_terminal.terminalhandle.md#removelast)
- [setInput](frontend_views_terminal.terminalhandle.md#setinput)
- [setUserInputEnabled](frontend_views_terminal.terminalhandle.md#setuserinputenabled)

## Properties

### clear

• **clear**: () => _void_

#### Type declaration

▸ (): _void_

**Returns:** _void_

---

### focus

• **focus**: () => _void_

#### Type declaration

▸ (): _void_

**Returns:** _void_

---

### getInput

• **getInput**: () => _Promise_<string\>

#### Type declaration

▸ (): _Promise_<string\>

**Returns:** _Promise_<string\>

---

### newline

• **newline**: () => _void_

#### Type declaration

▸ (): _void_

**Returns:** _void_

---

### print

• **print**: (`str`: _string_, `style?`: [_Green_](../enums/frontend_utils_terminaltypes.terminaltextstyle.md#green) \| [_Sub_](../enums/frontend_utils_terminaltypes.terminaltextstyle.md#sub) \| [_White_](../enums/frontend_utils_terminaltypes.terminaltextstyle.md#white) \| [_Red_](../enums/frontend_utils_terminaltypes.terminaltextstyle.md#red) \| [_Blue_](../enums/frontend_utils_terminaltypes.terminaltextstyle.md#blue) \| [_Invisible_](../enums/frontend_utils_terminaltypes.terminaltextstyle.md#invisible) \| [_Default_](../enums/frontend_utils_terminaltypes.terminaltextstyle.md#default) \| [_Underline_](../enums/frontend_utils_terminaltypes.terminaltextstyle.md#underline) \| [_Hoverable_](../enums/frontend_utils_terminaltypes.terminaltextstyle.md#hoverable), `hoverContents?`: () => _Element_) => _void_

#### Type declaration

▸ (`str`: _string_, `style?`: [_Green_](../enums/frontend_utils_terminaltypes.terminaltextstyle.md#green) \| [_Sub_](../enums/frontend_utils_terminaltypes.terminaltextstyle.md#sub) \| [_White_](../enums/frontend_utils_terminaltypes.terminaltextstyle.md#white) \| [_Red_](../enums/frontend_utils_terminaltypes.terminaltextstyle.md#red) \| [_Blue_](../enums/frontend_utils_terminaltypes.terminaltextstyle.md#blue) \| [_Invisible_](../enums/frontend_utils_terminaltypes.terminaltextstyle.md#invisible) \| [_Default_](../enums/frontend_utils_terminaltypes.terminaltextstyle.md#default) \| [_Underline_](../enums/frontend_utils_terminaltypes.terminaltextstyle.md#underline) \| [_Hoverable_](../enums/frontend_utils_terminaltypes.terminaltextstyle.md#hoverable), `hoverContents?`: () => _Element_): _void_

#### Parameters

| Name             | Type                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| :--------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `str`            | _string_                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `style?`         | [_Green_](../enums/frontend_utils_terminaltypes.terminaltextstyle.md#green) \| [_Sub_](../enums/frontend_utils_terminaltypes.terminaltextstyle.md#sub) \| [_White_](../enums/frontend_utils_terminaltypes.terminaltextstyle.md#white) \| [_Red_](../enums/frontend_utils_terminaltypes.terminaltextstyle.md#red) \| [_Blue_](../enums/frontend_utils_terminaltypes.terminaltextstyle.md#blue) \| [_Invisible_](../enums/frontend_utils_terminaltypes.terminaltextstyle.md#invisible) \| [_Default_](../enums/frontend_utils_terminaltypes.terminaltextstyle.md#default) \| [_Underline_](../enums/frontend_utils_terminaltypes.terminaltextstyle.md#underline) \| [_Hoverable_](../enums/frontend_utils_terminaltypes.terminaltextstyle.md#hoverable) |
| `hoverContents?` | () => _Element_                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |

**Returns:** _void_

---

### printElement

• **printElement**: (`element`: _ReactElement_<any, string \| (`props`: _any_) => `null` \| _ReactElement_<any, any\> \| (`props`: _any_) => _Component_<any, any, any\>\>) => _void_

#### Type declaration

▸ (`element`: _ReactElement_<any, string \| (`props`: _any_) => `null` \| _ReactElement_<any, any\> \| (`props`: _any_) => _Component_<any, any, any\>\>): _void_

#### Parameters

| Name      | Type                                                                                                                                       |
| :-------- | :----------------------------------------------------------------------------------------------------------------------------------------- |
| `element` | _ReactElement_<any, string \| (`props`: _any_) => `null` \| _ReactElement_<any, any\> \| (`props`: _any_) => _Component_<any, any, any\>\> |

**Returns:** _void_

---

### printLink

• **printLink**: (`str`: _string_, `onClick`: () => _void_, `style`: [_TerminalTextStyle_](../enums/frontend_utils_terminaltypes.terminaltextstyle.md)) => _void_

#### Type declaration

▸ (`str`: _string_, `onClick`: () => _void_, `style`: [_TerminalTextStyle_](../enums/frontend_utils_terminaltypes.terminaltextstyle.md)): _void_

#### Parameters

| Name      | Type                                                                              |
| :-------- | :-------------------------------------------------------------------------------- |
| `str`     | _string_                                                                          |
| `onClick` | () => _void_                                                                      |
| `style`   | [_TerminalTextStyle_](../enums/frontend_utils_terminaltypes.terminaltextstyle.md) |

**Returns:** _void_

---

### printLoadingBar

• **printLoadingBar**: (`prettyEntityName`: _string_, `ref`: _RefObject_<[_LoadingBarHandle_](frontend_components_textloadingbar.loadingbarhandle.md)\>) => _void_

#### Type declaration

▸ (`prettyEntityName`: _string_, `ref`: _RefObject_<[_LoadingBarHandle_](frontend_components_textloadingbar.loadingbarhandle.md)\>): _void_

#### Parameters

| Name               | Type                                                                                       |
| :----------------- | :----------------------------------------------------------------------------------------- |
| `prettyEntityName` | _string_                                                                                   |
| `ref`              | _RefObject_<[_LoadingBarHandle_](frontend_components_textloadingbar.loadingbarhandle.md)\> |

**Returns:** _void_

---

### printLoadingSpinner

• **printLoadingSpinner**: () => _void_

#### Type declaration

▸ (): _void_

**Returns:** _void_

---

### printShellLn

• **printShellLn**: (`str`: _string_) => _void_

#### Type declaration

▸ (`str`: _string_): _void_

#### Parameters

| Name  | Type     |
| :---- | :------- |
| `str` | _string_ |

**Returns:** _void_

---

### println

• **println**: (`str`: _string_, `style?`: [_Green_](../enums/frontend_utils_terminaltypes.terminaltextstyle.md#green) \| [_Sub_](../enums/frontend_utils_terminaltypes.terminaltextstyle.md#sub) \| [_White_](../enums/frontend_utils_terminaltypes.terminaltextstyle.md#white) \| [_Red_](../enums/frontend_utils_terminaltypes.terminaltextstyle.md#red) \| [_Blue_](../enums/frontend_utils_terminaltypes.terminaltextstyle.md#blue) \| [_Invisible_](../enums/frontend_utils_terminaltypes.terminaltextstyle.md#invisible) \| [_Default_](../enums/frontend_utils_terminaltypes.terminaltextstyle.md#default) \| [_Underline_](../enums/frontend_utils_terminaltypes.terminaltextstyle.md#underline) \| [_Hoverable_](../enums/frontend_utils_terminaltypes.terminaltextstyle.md#hoverable), `hoverContents?`: () => _Element_) => _void_

#### Type declaration

▸ (`str`: _string_, `style?`: [_Green_](../enums/frontend_utils_terminaltypes.terminaltextstyle.md#green) \| [_Sub_](../enums/frontend_utils_terminaltypes.terminaltextstyle.md#sub) \| [_White_](../enums/frontend_utils_terminaltypes.terminaltextstyle.md#white) \| [_Red_](../enums/frontend_utils_terminaltypes.terminaltextstyle.md#red) \| [_Blue_](../enums/frontend_utils_terminaltypes.terminaltextstyle.md#blue) \| [_Invisible_](../enums/frontend_utils_terminaltypes.terminaltextstyle.md#invisible) \| [_Default_](../enums/frontend_utils_terminaltypes.terminaltextstyle.md#default) \| [_Underline_](../enums/frontend_utils_terminaltypes.terminaltextstyle.md#underline) \| [_Hoverable_](../enums/frontend_utils_terminaltypes.terminaltextstyle.md#hoverable), `hoverContents?`: () => _Element_): _void_

#### Parameters

| Name             | Type                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| :--------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `str`            | _string_                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `style?`         | [_Green_](../enums/frontend_utils_terminaltypes.terminaltextstyle.md#green) \| [_Sub_](../enums/frontend_utils_terminaltypes.terminaltextstyle.md#sub) \| [_White_](../enums/frontend_utils_terminaltypes.terminaltextstyle.md#white) \| [_Red_](../enums/frontend_utils_terminaltypes.terminaltextstyle.md#red) \| [_Blue_](../enums/frontend_utils_terminaltypes.terminaltextstyle.md#blue) \| [_Invisible_](../enums/frontend_utils_terminaltypes.terminaltextstyle.md#invisible) \| [_Default_](../enums/frontend_utils_terminaltypes.terminaltextstyle.md#default) \| [_Underline_](../enums/frontend_utils_terminaltypes.terminaltextstyle.md#underline) \| [_Hoverable_](../enums/frontend_utils_terminaltypes.terminaltextstyle.md#hoverable) |
| `hoverContents?` | () => _Element_                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |

**Returns:** _void_

---

### removeLast

• **removeLast**: (`n`: _number_) => _void_

#### Type declaration

▸ (`n`: _number_): _void_

#### Parameters

| Name | Type     |
| :--- | :------- |
| `n`  | _number_ |

**Returns:** _void_

---

### setInput

• **setInput**: (`input`: _string_) => _void_

#### Type declaration

▸ (`input`: _string_): _void_

#### Parameters

| Name    | Type     |
| :------ | :------- |
| `input` | _string_ |

**Returns:** _void_

---

### setUserInputEnabled

• **setUserInputEnabled**: (`enabled`: _boolean_) => _void_

#### Type declaration

▸ (`enabled`: _boolean_): _void_

#### Parameters

| Name      | Type      |
| :-------- | :-------- |
| `enabled` | _boolean_ |

**Returns:** _void_
