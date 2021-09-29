import { useState, useEffect, useRef } from "react";

export const useTimer = (isRunning) => {
  const [elapsedTime, setElapsedTime] = useState(0);
  const startTime = useRef(0);

  useEffect(() => {
    if (isRunning) {
      startTime.current = Date.now() - elapsedTime;
      const intervalId = setInterval(() => {
        const currentTime = Date.now();
        setElapsedTime(currentTime - startTime.current);
      });
      return () => {
        clearInterval(intervalId);
      };
    }
  }, [isRunning]);

  const resetTimer = () => {
    setElapsedTime(0);
    startTime.current = Date.now();
  };

  return { elapsedTime, resetTimer };
};
