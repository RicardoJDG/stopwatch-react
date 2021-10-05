import { useEffect } from 'react';

export const useTimer = (state, updateTime) => {
  useEffect(() => {
    if (state.isRunning) {
      const startTime = Date.now() - state.elapsedTime;
      const intervalId = setInterval(() => {
        const currentTime = Date.now();
        updateTime(currentTime - startTime);
      });
      return () => {
        clearInterval(intervalId);
      };
    }
  }, [state.isRunning]);
};
