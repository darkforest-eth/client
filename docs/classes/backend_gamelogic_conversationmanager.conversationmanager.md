# Class: ConversationManager

[Backend/GameLogic/ConversationManager](../modules/backend_gamelogic_conversationmanager.md).ConversationManager

## Table of contents

### Constructors

- [constructor](backend_gamelogic_conversationmanager.conversationmanager.md#constructor)

### Properties

- [artifact](backend_gamelogic_conversationmanager.conversationmanager.md#artifact)
- [artifactId](backend_gamelogic_conversationmanager.conversationmanager.md#artifactid)
- [conversation](backend_gamelogic_conversationmanager.conversationmanager.md#conversation)
- [setConversation](backend_gamelogic_conversationmanager.conversationmanager.md#setconversation)
- [setLoading](backend_gamelogic_conversationmanager.conversationmanager.md#setloading)
- [terminal](backend_gamelogic_conversationmanager.conversationmanager.md#terminal)
- [username](backend_gamelogic_conversationmanager.conversationmanager.md#username)

### Methods

- [printClean](backend_gamelogic_conversationmanager.conversationmanager.md#printclean)
- [printLastMessage](backend_gamelogic_conversationmanager.conversationmanager.md#printlastmessage)
- [start](backend_gamelogic_conversationmanager.conversationmanager.md#start)

## Constructors

### constructor

\+ **new ConversationManager**(`terminal`: _MutableRefObject_<undefined \| [_TerminalHandle_](../interfaces/frontend_views_terminal.terminalhandle.md)\>, `setConversation`: (`conversation`: Conversation) => _void_, `setLoading`: (`loading`: _boolean_) => _void_, `artifactType`: ArtifactType, `artifactRarity`: ArtifactRarity): [_ConversationManager_](backend_gamelogic_conversationmanager.conversationmanager.md)

#### Parameters

| Name              | Type                                                                                                          |
| :---------------- | :------------------------------------------------------------------------------------------------------------ |
| `terminal`        | _MutableRefObject_<undefined \| [_TerminalHandle_](../interfaces/frontend_views_terminal.terminalhandle.md)\> |
| `setConversation` | (`conversation`: Conversation) => _void_                                                                      |
| `setLoading`      | (`loading`: _boolean_) => _void_                                                                              |
| `artifactType`    | ArtifactType                                                                                                  |
| `artifactRarity`  | ArtifactRarity                                                                                                |

**Returns:** [_ConversationManager_](backend_gamelogic_conversationmanager.conversationmanager.md)

## Properties

### artifact

• `Private` **artifact**: ConversationArtifact

---

### artifactId

• `Private` **artifactId**: _string_

---

### conversation

• `Private` **conversation**: Conversation

---

### setConversation

• `Private` **setConversation**: (`conversation`: Conversation) => _void_

#### Type declaration

▸ (`conversation`: Conversation): _void_

#### Parameters

| Name           | Type         |
| :------------- | :----------- |
| `conversation` | Conversation |

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

---

### username

• `Private` **username**: _string_

## Methods

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

### printLastMessage

▸ `Private` **printLastMessage**(`message`: Message): _void_

#### Parameters

| Name      | Type    |
| :-------- | :------ |
| `message` | Message |

**Returns:** _void_

---

### start

▸ **start**(): _Promise_<void\>

**Returns:** _Promise_<void\>
