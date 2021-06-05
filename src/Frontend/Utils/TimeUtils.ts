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
