# Module: Frontend/Utils/constants

## Table of contents

### Enumerations

- [GameWindowZIndex](../enums/frontend_utils_constants.gamewindowzindex.md)

### Variables

- [BLOCK_EXPLORER_URL](frontend_utils_constants.md#block_explorer_url)
- [HAT_SIZES](frontend_utils_constants.md#hat_sizes)
- [LOCATION_ID_UB](frontend_utils_constants.md#location_id_ub)
- [MAX_CHUNK_SIZE](frontend_utils_constants.md#max_chunk_size)
- [MIN_CHUNK_SIZE](frontend_utils_constants.md#min_chunk_size)
- [XDAI_CHAIN_ID](frontend_utils_constants.md#xdai_chain_id)

## Variables

### BLOCK_EXPLORER_URL

• `Const` **BLOCK_EXPLORER_URL**: `"https://blockscout.com/poa/xdai"`= 'https://blockscout.com/poa/xdai'

---

### HAT_SIZES

• `Const` **HAT_SIZES**: _string_[]

---

### LOCATION_ID_UB

• `Const` **LOCATION_ID_UB**: BigInteger

---

### MAX_CHUNK_SIZE

• `Const` **MAX_CHUNK_SIZE**: _number_

**`tutorial`** to speed up the game's background rendering code, it is possible to set this value to
be a higher power of two. This means that smaller chunks will be merged into larger chunks via
the algorithms implemented in {@link ChunkUtils}.

{@code Math.floor(Math.pow(2, 16))} should be large enough for most.

---

### MIN_CHUNK_SIZE

• `Const` **MIN_CHUNK_SIZE**: `16`= 16

---

### XDAI_CHAIN_ID

• `Const` **XDAI_CHAIN_ID**: `100`= 100
