# Module: Backend/Network/ChainAPI

## Table of contents

### Variables

- [DEFAULT_GAS_PRICES](backend_network_chainapi.md#default_gas_prices)
- [MAX_AUTO_GAS_PRICE_GWEI](backend_network_chainapi.md#max_auto_gas_price_gwei)

### Functions

- [getAutoGasPrices](backend_network_chainapi.md#getautogasprices)

## Variables

### DEFAULT_GAS_PRICES

• `Const` **DEFAULT_GAS_PRICES**: _Readonly_<GasPrices\>

In case of errors, these are the default gas prices.

---

### MAX_AUTO_GAS_PRICE_GWEI

• `Const` **MAX_AUTO_GAS_PRICE_GWEI**: `15`= 15

In case xDai's auto-price is something ridiculous, we don't want our players to insta run out of
money.

## Functions

### getAutoGasPrices

▸ **getAutoGasPrices**(): _Promise_<GasPrices\>

Gets the current gas prices from xDai's price oracle. If the oracle is broken, return some sane
defaults.

**Returns:** _Promise_<GasPrices\>
