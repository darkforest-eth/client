import { address } from '@darkforest_eth/serde';
import { EthAddress } from '@darkforest_eth/types';
import { utils } from 'ethers';
import stringify from 'json-stable-stringify';

/**
 * Represents an account with which the user plays the game.
 */
export interface Account {
  address: EthAddress;
  privateKey: string;
}

const ACTIVE_TIME = 1000 * 60 * 60 * 24 * 7;
/**
 * This is the key in local storage in which we keep an array of all the public addresses of the
 * accounts that have been imported/generated into this client.
 */
const ADDRESS_LOCAL_STORAGE_KEY = 'KNOWN_ADDRESSES';
const ACTIVE_LOCAL_STORAGE_KEY = 'ACTIVE_ADDRESS';
const ACTIVE_SET_TIME_STORAGE_KEY = 'ACTIVE_SET';
/**
 * In-memory representation of all the accounts in this client.
 */
const accounts: Account[] = load();

/**
 * Store all of the accounts in local storage.
 */
function save() {
  localStorage.setItem(
    ADDRESS_LOCAL_STORAGE_KEY,
    stringify(accounts.map((account) => account.address))
  );

  for (const account of accounts) {
    localStorage.setItem(`skey-${account.address}`, account.privateKey);
  }
}

export function setActive(account: Account) {
  localStorage.setItem(ACTIVE_LOCAL_STORAGE_KEY, account.address);
  localStorage.setItem(`skey-${account.address}`, account.privateKey);

  localStorage.setItem(ACTIVE_SET_TIME_STORAGE_KEY, Date.now().toString());
}

/**
 * Store all of the accounts in local storage.
 */

export function resetActive(): void {
  localStorage.removeItem(ACTIVE_LOCAL_STORAGE_KEY);

  localStorage.removeItem(ACTIVE_SET_TIME_STORAGE_KEY);
}

function loadActive(): Account | undefined {
  const timeSetStr = localStorage.getItem(ACTIVE_SET_TIME_STORAGE_KEY);
  const timeSet = Number(timeSetStr);
  const activeAccount = localStorage.getItem(ACTIVE_LOCAL_STORAGE_KEY);

  if (
    timeSetStr == null ||
    timeSet == NaN ||
    activeAccount == null ||
    timeSetStr == '' ||
    activeAccount == '' ||
    Date.now() - ACTIVE_TIME > timeSet
  ) {
    resetActive();
    return undefined;
  }

  return accounts.find((account) => account.address == address(activeAccount));
}

/**
 * Load all of the accounts from local storage.
 */
function load(): Account[] {
  const knownAddresses: EthAddress[] = [];
  const accounts: Account[] = [];

  // first we load the public addresses
  const serializedAddresses = localStorage.getItem(ADDRESS_LOCAL_STORAGE_KEY);
  if (serializedAddresses && serializedAddresses.length > 0) {
    const addresses = JSON.parse(serializedAddresses) as string[];
    for (const addressStr of addresses) {
      knownAddresses.push(address(addressStr));
    }
  }

  // then we load the private keys
  for (const addy of knownAddresses) {
    const skey = localStorage.getItem(`skey-${addy}`);

    if (skey !== null) {
      accounts.push({
        address: addy,
        privateKey: skey,
      });
    }
  }

  return accounts;
}

/**
 * Returns the list of accounts that are logged into the game.
 */
export function getAccounts(): Account[] {
  return [...accounts];
}

export function getActive(): Account | undefined {
  return loadActive();
}

/**
 * Adds the given account, and saves it to localstorage.
 */
export function addAccount(privateKey: string) {
  accounts.push({
    address: address(utils.computeAddress(privateKey)),
    privateKey,
  });

  save();
}

export function logOut() {
  resetActive();
  window.location.reload();
}