import {
  EthAddress,
  RegisterResponse,
  SignedMessage,
  WhitelistStatusResponse,
} from '@darkforest_eth/types';
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

async function sleep(timeoutMs: number) {
  return new Promise<void>((resolve) => {
    setTimeout(() => resolve(), timeoutMs);
  });
}

export type RegisterConfirmationResponse = {
  /**
   * If the whitelist registration is successful,
   * this is populated with the hash of the
   * transaction.
   */
  txHash?: string;
  /**
   * If the whitelist registration is unsuccessful,
   * this is populated with the error message explaining
   * why.
   */
  errorMessage?: string;
  /**
   * If the whitelist registration is unsuccessful, this
   * is true if the client is able to retry registration.
   */
  canRetry?: boolean;
};

/**
 * Starts the registration process for the user then
 * polls for success.
 */
export async function callRegisterAndWaitForConfirmation(
  key: string,
  address: EthAddress,
  terminal: React.MutableRefObject<TerminalHandle | undefined>
): Promise<RegisterConfirmationResponse> {
  if (!process.env.DF_WEBSERVER_URL) {
    return { errorMessage: 'Cannot connect to server.', canRetry: false };
  }

  const response = await submitWhitelistKey(key, address);

  if (response?.error) {
    return { errorMessage: response.error, canRetry: false };
  }

  while (true) {
    const statusResponse = await whitelistStatus(address);
    if (!statusResponse) return { errorMessage: 'Cannot connect to server.', canRetry: false };

    terminal.current?.newline();
    if (statusResponse.failedAt) {
      return { errorMessage: 'Transaction failed.', canRetry: true };
    } else if (statusResponse.txHash) {
      return { txHash: statusResponse.txHash };
    } else if (statusResponse.position) {
      if (statusResponse.position !== '0') {
        terminal.current?.print('Position in queue: ' + statusResponse.position + '\n');
      } else {
        terminal.current?.print('Position in queue: You are up next!');
      }
    } else {
      terminal.current?.print('Entering queue...');
    }

    await sleep(3000);
  }
}

export const whitelistStatus = async (
  address: EthAddress
): Promise<WhitelistStatusResponse | null> => {
  if (!process.env.DF_WEBSERVER_URL) {
    return null;
  }

  return await fetch(`${process.env.DF_WEBSERVER_URL}/whitelist/address/${address}/isWhitelisted`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((x) => x.json());
};

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
