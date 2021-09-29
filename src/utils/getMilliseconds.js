export const beginTimer = (startTime) => {
  const currentTime = Date.now();
  const time = currentTime - startTime;

  return time;
};
