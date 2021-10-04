import { useState, useEffect } from 'react';

export const useTimer = (isRunning) => {
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    if (isRunning) {
      const startTime = Date.now() - elapsedTime;
      const intervalId = setInterval(() => {
        const currentTime = Date.now();
        setElapsedTime(currentTime - startTime);
      });
      return () => clearInterval(intervalId);
    }
  }, [isRunning]);

  const resetTimer = () => {
    setElapsedTime(0);
  };

  return { elapsedTime, resetTimer };
};
