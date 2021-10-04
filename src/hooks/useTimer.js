import { useEffect, useReducer } from 'react';

import { Actions, reducer, initialLapState } from '../lapsReducer';

export const useTimer = (isRunning) => {
  const [laps, dispatch] = useReducer(reducer, initialLapState);
  const { elapsedTime } = laps;

  useEffect(() => {
    if (isRunning) {
      const startTime = Date.now() - elapsedTime;
      const intervalId = setInterval(() => {
        const currentTime = Date.now();
        dispatch({ type: Actions.UPDATE_TIMER, payload: { time: currentTime - startTime } });
      });
      return () => {
        clearInterval(intervalId);
      };
    }
  }, [isRunning]);

  return { elapsedTime };
};
