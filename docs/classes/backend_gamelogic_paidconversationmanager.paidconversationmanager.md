# Class: PaidConversationManager

[Backend/GameLogic/PaidConversationManager](../modules/backend_gamelogic_paidconversationmanager.md).PaidConversationManager

## Table of contents

### Constructors

- [constructor](backend_gamelogic_paidconversationmanager.paidconversationmanager.md#constructor)

### Properties

- [artifact](backend_gamelogic_paidconversationmanager.paidconversationmanager.md#artifact)
- [conversation](backend_gamelogic_paidconversationmanager.paidconversationmanager.md#conversation)
- [gameUIManager](backend_gamelogic_paidconversationmanager.paidconversationmanager.md#gameuimanager)
- [setConversation](backend_gamelogic_paidconversationmanager.paidconversationmanager.md#setconversation)
- [setLoading](backend_gamelogic_paidconversationmanager.paidconversationmanager.md#setloading)
- [terminal](backend_gamelogic_paidconversationmanager.paidconversationmanager.md#terminal)

### Methods

- [getQuestionsRemaining](backend_gamelogic_paidconversationmanager.paidconversationmanager.md#getquestionsremaining)
- [printAllMessages](backend_gamelogic_paidconversationmanager.paidconversationmanager.md#printallmessages)
- [printClean](backend_gamelogic_paidconversationmanager.paidconversationmanager.md#printclean)
- [printMessage](backend_gamelogic_paidconversationmanager.paidconversationmanager.md#printmessage)
- [start](backend_gamelogic_paidconversationmanager.paidconversationmanager.md#start)

## Constructors

### constructor

\+ **new PaidConversationManager**(`gameUIManager`: [_default_](backend_gamelogic_gameuimanager.default.md), `terminal`: _MutableRefObject_<undefined \| [_TerminalHandle_](../interfaces/frontend_views_terminal.terminalhandle.md)\>, `setConversation`: (`conversation`: Conversation) => _void_, `setLoading`: (`loading`: _boolean_) => _void_, `artifact`: Artifact): [_PaidConversationManager_](backend_gamelogic_paidconversationmanager.paidconversationmanager.md)

#### Parameters

| Name              | Type                                                                                                          |
| :---------------- | :------------------------------------------------------------------------------------------------------------ |
| `gameUIManager`   | [_default_](backend_gamelogic_gameuimanager.default.md)                                                       |
| `terminal`        | _MutableRefObject_<undefined \| [_TerminalHandle_](../interfaces/frontend_views_terminal.terminalhandle.md)\> |
| `setConversation` | (`conversation`: Conversation) => _void_                                                                      |
| `setLoading`      | (`loading`: _boolean_) => _void_                                                                              |
| `artifact`        | Artifact                                                                                                      |

**Returns:** [_PaidConversationManager_](backend_gamelogic_paidconversationmanager.paidconversationmanager.md)

## Properties

### artifact

• `Private` **artifact**: Artifact

---

### conversation

• `Private` **conversation**: _undefined_ \| Conversation

---

### gameUIManager

• `Private` **gameUIManager**: [_default_](backend_gamelogic_gameuimanager.default.md)

---

### setConversation

• `Private` **setConversation**: (`conversation`: _undefined_ \| Conversation) => _void_

#### Type declaration

▸ (`conversation`: _undefined_ \| Conversation): _void_

#### Parameters

| Name           | Type                        |
| :------------- | :-------------------------- |
| `conversation` | _undefined_ \| Conversation |

**Returns:** _void_

---

### setLoading

• `Private` **setLoading**: (`loading`: _boolean_) => _void_

#### Type declaration

▸ (`loading`: _boolean_): _void_

#### Parameters

| Name      | Type      |
| :-------- | :-------- |
| `loading` | _boolean_ |

**Returns:** _void_

---

### terminal

• `Private` **terminal**: _MutableRefObject_<undefined \| [_TerminalHandle_](../interfaces/frontend_views_terminal.terminalhandle.md)\>

## Methods

### getQuestionsRemaining

▸ **getQuestionsRemaining**(): _undefined_ \| _number_

**Returns:** _undefined_ \| _number_

---

### printAllMessages

▸ `Private` **printAllMessages**(): _void_

**Returns:** _void_

---

### printClean

▸ `Private` **printClean**(`message`: _string_, `style?`: [_Green_](../enums/frontend_utils_terminaltypes.terminaltextstyle.md#green) \| [_Sub_](../enums/frontend_utils_terminaltypes.terminaltextstyle.md#sub) \| [_White_](../enums/frontend_utils_terminaltypes.terminaltextstyle.md#white) \| [_Red_](../enums/frontend_utils_terminaltypes.terminaltextstyle.md#red) \| [_Blue_](../enums/frontend_utils_terminaltypes.terminaltextstyle.md#blue) \| [_Invisible_](../enums/frontend_utils_terminaltypes.terminaltextstyle.md#invisible) \| [_Default_](../enums/frontend_utils_terminaltypes.terminaltextstyle.md#default) \| [_Underline_](../enums/frontend_utils_terminaltypes.terminaltextstyle.md#underline) \| [_Hoverable_](../enums/frontend_utils_terminaltypes.terminaltextstyle.md#hoverable), `hoverContents?`: () => _Element_): _void_

#### Parameters

| Name             | Type                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| :--------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `message`        | _string_                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `style?`         | [_Green_](../enums/frontend_utils_terminaltypes.terminaltextstyle.md#green) \| [_Sub_](../enums/frontend_utils_terminaltypes.terminaltextstyle.md#sub) \| [_White_](../enums/frontend_utils_terminaltypes.terminaltextstyle.md#white) \| [_Red_](../enums/frontend_utils_terminaltypes.terminaltextstyle.md#red) \| [_Blue_](../enums/frontend_utils_terminaltypes.terminaltextstyle.md#blue) \| [_Invisible_](../enums/frontend_utils_terminaltypes.terminaltextstyle.md#invisible) \| [_Default_](../enums/frontend_utils_terminaltypes.terminaltextstyle.md#default) \| [_Underline_](../enums/frontend_utils_terminaltypes.terminaltextstyle.md#underline) \| [_Hoverable_](../enums/frontend_utils_terminaltypes.terminaltextstyle.md#hoverable) |
| `hoverContents?` | () => _Element_                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |

**Returns:** _void_

---

### printMessage

▸ `Private` **printMessage**(`message`: Message): _void_

#### Parameters

| Name      | Type    |
| :-------- | :------ |
| `message` | Message |

**Returns:** _void_

---

### start

▸ **start**(): _Promise_<void\>

**Returns:** _Promise_<void\>
