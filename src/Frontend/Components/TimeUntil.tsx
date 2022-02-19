import React, { useEffect, useState } from 'react';

/**
 * Given a timestamp, displays the amount of time until the timestamp from now in hh:mm:ss format.
 * If the timestamp is in the past, displays the given hardcoded value.
 */
export function TimeUntil({ timestamp, ifPassed }: { timestamp: number; ifPassed: string }) {
  const [value, setValue] = useState('');

  useEffect(() => {
    const update = () => {
      const msWait = timestamp - Date.now();

      if (msWait <= 0) {
        setValue(ifPassed);
      } else {
        setValue(formatDuration(msWait));
      }
    };

    const interval = setInterval(() => {
      update();
    }, 1000);

    update();
    return () => clearInterval(interval);
  }, [timestamp, ifPassed]);

  return <span>{value}</span>;
}

export function formatDuration(msDuration: number): string {
  const hoursWait = Math.floor(msDuration / 1000 / 60 / 60);
  const minutes = Math.floor((msDuration - hoursWait * 60 * 60 * 1000) / 1000 / 60);
  const seconds = Math.floor(
    (msDuration - hoursWait * 60 * 60 * 1000 - minutes * 60 * 1000) / 1000
  );
  const str =
    hoursWait + ':' + (minutes + '').padStart(2, '0') + ':' + (seconds + '').padStart(2, '0');
  return str;
}
