# Module: Backend/Network/NetworkHealthApi

## Table of contents

### Variables

- [WEBSERVER_URL](Backend_Network_NetworkHealthApi.md#webserver_url)

### Functions

- [loadNetworkHealth](Backend_Network_NetworkHealthApi.md#loadnetworkhealth)

## Variables

### WEBSERVER_URL

• `Const` **WEBSERVER_URL**: `string`

## Functions

### loadNetworkHealth

▸ **loadNetworkHealth**(): `Promise`<`NetworkHealthSummary`\>

The Dark Forest webserver keeps track of network health, this function loads that information
from the webserver.

#### Returns

`Promise`<`NetworkHealthSummary`\>
