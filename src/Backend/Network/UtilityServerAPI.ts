import { EthAddress, SignedMessage } from '@darkforest_eth/types';
import * as EmailValidator from 'email-validator';
import timeout from 'p-timeout';
import { TerminalHandle } from '../../Frontend/Views/Terminal';
import { AddressTwitterMap } from '../../_types/darkforest/api/UtilityServerAPITypes';

export const enum EmailResponse {
  Success,
  Invalid,
  ServerError,
}

export const submitInterestedEmail = async (email: string): Promise<EmailResponse> => {
  if (!process.env.DF_WEBSERVER_URL) {
    return EmailResponse.ServerError;
  }

  if (!EmailValidator.validate(email)) {
    return EmailResponse.Invalid;
  }
  const { success } = await fetch(`${process.env.DF_WEBSERVER_URL}/email/interested`, {
    method: 'POST',
    body: JSON.stringify({ email }),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((x) => x.json());

  return success ? EmailResponse.Success : EmailResponse.ServerError;
};

export const submitUnsubscribeEmail = async (email: string): Promise<EmailResponse> => {
  if (!process.env.DF_WEBSERVER_URL) {
    return EmailResponse.ServerError;
  }

  if (!EmailValidator.validate(email)) {
    return EmailResponse.Invalid;
  }
  const { success } = await fetch(`${process.env.DF_WEBSERVER_URL}/email/unsubscribe`, {
    method: 'POST',
    body: JSON.stringify({ email }),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((x) => x.json());

  return success ? EmailResponse.Success : EmailResponse.ServerError;
};

export const submitPlayerEmail = async (
  request?: SignedMessage<{ email: string }>
): Promise<EmailResponse> => {
  if (!process.env.DF_WEBSERVER_URL) {
    return EmailResponse.ServerError;
  }

  if (!request || !EmailValidator.validate(request.message.email)) {
    return EmailResponse.Invalid;
  }

  const { success } = await fetch(`${process.env.DF_WEBSERVER_URL}/email/playing`, {
    method: 'POST',
    body: JSON.stringify(request),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((x) => x.json());

  return success ? EmailResponse.Success : EmailResponse.ServerError;
};

type RegisterResponse = { inProgress: boolean; success?: boolean; txHash: string; error?: string };

async function sleep(timeoutMs: number) {
  return new Promise<void>((resolve) => {
    setTimeout(() => resolve(), timeoutMs);
  });
}

/**
 * Attempts to register the given player into the game.
 *
 * - if the key is invalid, returns `undefined`
 * - if there is an error submitting the whitelist key, indicated by a null response, or if the
 *   response is not successful, tries again, until it succeeds.
 */
export async function callRegisterUntilWhitelisted(
  key: string,
  address: EthAddress,
  terminal: React.MutableRefObject<TerminalHandle | undefined>
): Promise<string | undefined> {
  if (!process.env.DF_WEBSERVER_URL) {
    return undefined;
  }

  while (true) {
    const response = await submitWhitelistKey(key, address);
    if (response?.error) {
      // returning undefined here indicates to the ui that the key was invalid
      return undefined;
    } else if (response !== null && response.success) {
      return response.txHash ?? 'unknown';
    } else {
      terminal.current?.print('.');
      await sleep(3000);
    }
  }
}

/**
 * Submits a whitelist key to register the given player to the game. Returns null if there was an
 * error.
 */
export const submitWhitelistKey = async (
  key: string,
  address: EthAddress
): Promise<RegisterResponse | null> => {
  if (!process.env.DF_WEBSERVER_URL) {
    return null;
  }

  try {
    return await fetch(`${process.env.DF_WEBSERVER_URL}/whitelist/register`, {
      method: 'POST',
      body: JSON.stringify({
        key,
        address,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((x) => x.json());
  } catch (e) {
    console.error(`error when registering for whitelist: ${e}`);
    return null;
  }
};

export const requestDevFaucet = async (address: EthAddress): Promise<boolean> => {
  if (!process.env.DF_WEBSERVER_URL) {
    return false;
  }

  // TODO: Provide own env variable for this feature
  if (process.env.NODE_ENV === 'production') {
    return false;
  }

  try {
    const { success } = await fetch(`${process.env.DF_WEBSERVER_URL}/whitelist/faucet`, {
      method: 'POST',
      body: JSON.stringify({
        address,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((x) => x.json());

    return success;
  } catch (e) {
    console.error(`error when requesting drip: ${e}`);
    return false;
  }
};

/**
 * Swallows all errors. Either loads the address to twitter map from the webserver in 5 seconds, or
 * returan empty map.
 */
export const tryGetAllTwitters = async (): Promise<AddressTwitterMap> => {
  try {
    return await timeout(getAllTwitters(), 1000 * 5, "couldn't get twitter map");
  } catch (e) {}
  return {};
};

export const getAllTwitters = async (): Promise<AddressTwitterMap> => {
  try {
    const twitterMap: AddressTwitterMap = await fetch(
      `${process.env.DF_WEBSERVER_URL}/twitter/all-twitters`
    ).then((x) => x.json());
    return twitterMap;
  } catch (e) {
    return {};
  }
};

export const verifyTwitterHandle = async (
  verifyMessage: SignedMessage<{ twitter: string }>
): Promise<boolean> => {
  try {
    const res = await fetch(`${process.env.DF_WEBSERVER_URL}/twitter/verify-twitter`, {
      method: 'POST',
      body: JSON.stringify({
        verifyMessage,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((x) => x.json());

    return res.success;
  } catch (e) {
    console.error(`error when verifying twitter handle: ${e}`);
    return false;
  }
};

export const disconnectTwitter = async (
  disconnectMessage: SignedMessage<{ twitter: string }>
): Promise<boolean> => {
  try {
    const res = await fetch(`${process.env.DF_WEBSERVER_URL}/twitter/disconnect`, {
      method: 'POST',
      body: JSON.stringify({
        disconnectMessage,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((x) => x.json());

    return res.success;
  } catch (e) {
    console.error(`error when disconnecting twitter handle: ${e}`);
    return false;
  }
};
