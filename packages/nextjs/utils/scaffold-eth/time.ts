export function getFutureTimeInUnix(currentTime: Date): Number {
  // Get current time in UNIX timestamp (milliseconds)
  const current = currentTime.getTime();

  // Add 10 minutes (10 * 60 * 1000 milliseconds) to the current time
  const futureTime = current + 10 * 60 * 1000;

  // Convert to UNIX timestamp (seconds)
  const futureUnixTimestamp = Math.floor(futureTime / 1000);
  return futureUnixTimestamp;
}
