import {
  DeleteMessagesRequest,
  PlanetMessageRequest,
  PlanetMessageResponse,
  PostMessageRequest,
  SignedMessage,
} from '@darkforest_eth/types';

export async function getMessagesOnPlanets(
  request: PlanetMessageRequest
): Promise<PlanetMessageResponse> {
  if (request.planets.length === 0 || !process.env.DF_WEBSERVER_URL) {
    return {};
  }

  try {
    const response = await fetch(`${process.env.DF_WEBSERVER_URL}/messages`, {
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
      method: 'POST',
    });
    const responseBody = (await response.json()) as PlanetMessageResponse;
    if (response.status === 500) {
      throw new Error('failed to load messages');
    }
    return responseBody;
  } catch (e) {
    throw e;
  }
}

export async function addMessage(
  request: SignedMessage<PostMessageRequest<unknown>>
): Promise<void> {
  if (!process.env.DF_WEBSERVER_URL) {
    return;
  }

  try {
    const res = await fetch(`${process.env.DF_WEBSERVER_URL}/add-message`, {
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
      method: 'POST',
    });

    if (res.status === 500) {
      throw new Error('server error');
    }
  } catch (e) {
    console.log('failed to add message', request);
    console.log(e);
  }
}

export async function deleteMessages(request: SignedMessage<DeleteMessagesRequest>): Promise<void> {
  if (!process.env.DF_WEBSERVER_URL) {
    return;
  }

  try {
    const res = await fetch(`${process.env.DF_WEBSERVER_URL}/delete-messages`, {
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
      method: 'POST',
    });

    if (res.status === 500) {
      throw new Error('server error');
    }
  } catch (e) {
    console.log('failed delete messages', request);
    console.log(e);
  }
}
