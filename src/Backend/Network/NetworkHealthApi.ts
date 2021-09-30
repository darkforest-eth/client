import { NetworkHealthSummary } from '@darkforest_eth/types';

export const WEBSERVER_URL = process.env.WEBSERVER_URL as string;

/**
 * The Dark Forest webserver keeps track of network health, this function loads that information
 * from the webserver.
 */
export async function loadNetworkHealth(): Promise<NetworkHealthSummary> {
  const result = await fetch(`${WEBSERVER_URL}/network-health`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((x) => x.json());

  return result as NetworkHealthSummary;
}
