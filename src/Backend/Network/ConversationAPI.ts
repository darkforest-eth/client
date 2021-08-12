import { ArtifactId, Conversation, ConversationArtifact, EthAddress } from '@darkforest_eth/types';

const CONVERSATION_API_HOST = process.env.CONVERSATION_API_HOST as string;

/**
 * OPENAI PRODUCTION APPROVAL SUBMISSION ROUTES
 */

/**
 * For OpenAI production approval we need to prevent the UI from being publically accessible.
 * Therefore we send a link with a secret API key in the query string parameter, which is then
 * uploaded to the server along with each conversation request.
 */
function getDarkForestKey() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('darkForestKey');
}

export async function startConversationOpenAI(
  artifact: ConversationArtifact,
  artifactId: string,
  username: string
): Promise<Conversation> {
  const res = await fetch(`${CONVERSATION_API_HOST}/conversation/start_conversation`, {
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      darkforestKey: getDarkForestKey(),
      artifactName: artifact.name,
      artifactRarity: artifact.rarity,
      artifactType: artifact.type,
      artifactId,
      username,
    }),
    method: 'POST',
  });
  const rep = await res.json();
  if (rep.error) {
    throw new Error(rep.error);
  }
  return rep.conversation;
}

/* queue that holds the last 3 timestamps; if all of them are in the last 30s it fails
   OpenAI likes to rate-limit API usage - this ensures that max 6 requests per min are sent
   https://beta.openai.com/docs/use-case-guidelines/chatbots
*/
const lastThreeTimestamps: [number, number, number] = [0, 0, 0];

const THIRTY_SEC = 1000 * 30;
function within30s(t: [number, number, number]): boolean {
  const now = Date.now();
  return now - t[0] < THIRTY_SEC && now - t[1] < THIRTY_SEC && now - t[2] < THIRTY_SEC;
}

export async function stepConversationOpenAI(
  artifactId: string,
  message: string
): Promise<Conversation> {
  if (within30s(lastThreeTimestamps)) {
    console.log('too fast');
    throw new Error('Too many requests. Please a few seconds before trying again.');
  }

  lastThreeTimestamps.push(Date.now());
  lastThreeTimestamps.shift();

  const res = await fetch(`${CONVERSATION_API_HOST}/conversation/step_conversation`, {
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      darkforestKey: getDarkForestKey(),
      artifactId,
      message,
    }),
    method: 'POST',
  });
  const rep = await res.json();
  if (rep.error) {
    throw new Error(rep.error);
  }
  return rep.conversation;
}

/**
 * IN-GAME ROUTES
 */

export async function startConversation(
  timestamp: number,
  player: EthAddress,
  signature: string,
  artifactId: ArtifactId
): Promise<Conversation> {
  const res = await fetch(`${CONVERSATION_API_HOST}/conversation/start_conversation_v2`, {
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      timestamp,
      player,
      signature,
      artifactIdStr: artifactId,
    }),
    method: 'POST',
  });
  const rep = await res.json();
  if (rep.error) {
    throw new Error(rep.error);
  }
  return rep.conversation;
}

export async function stepConversation(
  timestamp: number,
  player: EthAddress,
  signature: string,
  artifactId: ArtifactId,
  message: string
): Promise<Conversation> {
  if (within30s(lastThreeTimestamps)) {
    console.log('too fast');
    throw new Error('Too many requests. Please a few seconds before trying again.');
  }

  lastThreeTimestamps.push(Date.now());
  lastThreeTimestamps.shift();

  const res = await fetch(`${CONVERSATION_API_HOST}/conversation/step_conversation_v2`, {
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      timestamp,
      player,
      signature,
      message,
      artifactIdStr: artifactId,
    }),
    method: 'POST',
  });
  const rep = await res.json();
  if (rep.error) {
    throw new Error(rep.error);
  }
  return rep.conversation;
}

export async function getConversation(artifactId: ArtifactId): Promise<Conversation | undefined> {
  const res = await fetch(`${CONVERSATION_API_HOST}/conversation/get_conversation/${artifactId}`, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (res.status === 404) {
    return undefined;
  }

  const rep = await res.json();
  if (rep.error) {
    throw new Error(rep.error);
  }

  return rep.conversation;
}
