const padTime = (time) => {
  return `${time.toString().padStart(2, '0')}`;
};

export const formatTime = (timeInMilliseconds) => {
  const seconds = Math.floor(timeInMilliseconds / 1000);
  const formattedSeconds = seconds < 60 ? seconds : seconds % 60;
  const minutes = Math.floor(timeInMilliseconds / 60000);
  const formattedMinutes = minutes < 60 ? minutes : minutes % 60;
  const hundredthSecond = timeInMilliseconds > 60 ? (timeInMilliseconds / 10) % 100 : timeInMilliseconds / 10;
  const flooredHundredthSecond = Math.floor(hundredthSecond);
  const hours = minutes >= 60 ? Math.floor(minutes / 60) : 0;

  return hours > 0
    ? padTime(hours) +
        ':' +
        padTime(formattedMinutes) +
        ':' +
        padTime(formattedSeconds) +
        ':' +
        padTime(flooredHundredthSecond)
    : padTime(formattedMinutes) + ':' + padTime(formattedSeconds) + ':' + padTime(flooredHundredthSecond);
};
