# Module: Backend/Network/ChainAPI

## Table of contents

### Variables

- [DEFAULT_GAS_PRICES](Backend_Network_ChainAPI.md#default_gas_prices)
- [MAX_AUTO_GAS_PRICE_GWEI](Backend_Network_ChainAPI.md#max_auto_gas_price_gwei)

### Functions

- [getAutoGasPrices](Backend_Network_ChainAPI.md#getautogasprices)

## Variables

### DEFAULT_GAS_PRICES

• `Const` **DEFAULT_GAS_PRICES**: `Readonly`<`GasPrices`\>

In case of errors, these are the default gas prices.

---

### MAX_AUTO_GAS_PRICE_GWEI

• `Const` **MAX_AUTO_GAS_PRICE_GWEI**: `15`

In case xDai's auto-price is something ridiculous, we don't want our players to insta run out of
money.

## Functions

### getAutoGasPrices

▸ **getAutoGasPrices**(): `Promise`<`GasPrices`\>

Gets the current gas prices from xDai's price oracle. If the oracle is broken, return some sane
defaults.

#### Returns

`Promise`<`GasPrices`\>
