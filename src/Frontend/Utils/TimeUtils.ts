export function formatDuration(durationMs: number) {
  if (durationMs < 0) {
    return '';
  }

  const hours = Math.floor(durationMs / 1000 / 60 / 60);
  const minutes = Math.floor((durationMs - hours * 60 * 60 * 1000) / 1000 / 60);
  const seconds = Math.floor((durationMs - hours * 60 * 60 * 1000 - minutes * 60 * 1000) / 1000);

  return (
    timestampSection(hours) + ':' + timestampSection(minutes) + ':' + timestampSection(seconds)
  );
}

function timestampSection(value: number) {
  return value.toString().padStart(2, '0');
}

export function formatDate(date: Date): string {
  // +1 to account for zero index on month and date
  return `${date.getMonth() + 1}/${date.getDate() + 1}/${date.getFullYear()}`
}

export function formatStartTime(startTime: number): string {
  const date = new Date(startTime * 1000);
  return formatDate(date) + ' ' + date.toLocaleTimeString()
}

