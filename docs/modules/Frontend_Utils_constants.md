# Module: Frontend/Utils/constants

## Table of contents

### Enumerations

- [GameWindowZIndex](../enums/Frontend_Utils_constants.GameWindowZIndex.md)

### Variables

- [HAT_SIZES](Frontend_Utils_constants.md#hat_sizes)
- [LOCATION_ID_UB](Frontend_Utils_constants.md#location_id_ub)
- [MAX_CHUNK_SIZE](Frontend_Utils_constants.md#max_chunk_size)
- [MIN_CHUNK_SIZE](Frontend_Utils_constants.md#min_chunk_size)

## Variables

### HAT_SIZES

• **HAT_SIZES**: `string`[]

---

### LOCATION_ID_UB

• **LOCATION_ID_UB**: `BigInteger`

---

### MAX_CHUNK_SIZE

• **MAX_CHUNK_SIZE**: `number`

**`tutorial`** to speed up the game's background rendering code, it is possible to set this value to
be a higher power of two. This means that smaller chunks will be merged into larger chunks via
the algorithms implemented in {@link ChunkUtils}.

{@code Math.floor(Math.pow(2, 16))} should be large enough for most.

---

### MIN_CHUNK_SIZE

• **MIN_CHUNK_SIZE**: `16`
