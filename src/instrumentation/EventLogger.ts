import { WEBSERVER_URL } from '../api/UtilityServerAPI';

export class EventLogger {
  private static instance: EventLogger;

  public static getInstance(): EventLogger {
    if (!EventLogger.instance) {
      EventLogger.instance = new EventLogger();
    }

    return EventLogger.instance;
  }

  static augmentEvent(event: unknown) {
    return Object.assign(event, {});
  }

  logEvent(event: unknown) {
    fetch(`${WEBSERVER_URL}/event`, {
      method: 'POST',
      body: JSON.stringify(EventLogger.augmentEvent(event)),
      headers: {
        'Content-Type': 'application/json',
      },
    }).catch((err) => console.log(err));
  }
}
