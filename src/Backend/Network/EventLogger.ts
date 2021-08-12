import { WEBSERVER_URL } from './UtilityServerAPI';

export const enum EventType {
  Transaction = 'transaction',
  Diagnostics = 'diagnostics',
}

export class EventLogger {
  private static augmentEvent(event: unknown, eventType: EventType) {
    return Object.assign(event, { df_event_type: eventType });
  }

  logEvent(eventType: EventType, event: unknown) {
    fetch(`${WEBSERVER_URL}/event`, {
      method: 'POST',
      body: JSON.stringify(EventLogger.augmentEvent(event, eventType)),
      headers: {
        'Content-Type': 'application/json',
      },
    }).catch((err) => console.log(err));
  }
}

export const eventLogger = new EventLogger();
