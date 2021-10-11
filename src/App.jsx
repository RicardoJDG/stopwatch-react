import React, { useReducer } from 'react';
import './App.css';

import LapsTable from './components/LapsTable';
import Button from './components/Button';

import { useTimer } from './hooks/useTimer';
import { formatTime } from './utils/formatting';
import { initialLapState, Actions, reducer } from './lapsReducer';

function App() {
  const [laps, dispatch] = useReducer(reducer, initialLapState);

  const updateTime = (timeToUpdate) => dispatch({ type: Actions.UPDATE_TIMER, payload: { time: timeToUpdate } });

  useTimer(laps, updateTime);

  const lapTimer = laps.elapsedTime - laps.totalLapsTime;

  const isDisabled = !laps.isRunning && laps.elapsedTime === 0;
  const stopStartButtonLabel = laps.isRunning ? 'Stop' : 'Start';
  const lapResetButtonLabel = isDisabled || laps.isRunning ? 'Lap' : 'Reset';
  const lapClass = isDisabled ? 'lapoff' : 'lap';

  const handleStartStop = () => dispatch({ type: Actions.TOGGLE_TIMER });
  const handleLaps = () => dispatch({ type: Actions.RECORD_LAP });
  const handleReset = () => dispatch({ type: Actions.RESET });

  const lapResetButtonHandler = laps.isRunning && laps.elapsedTime ? handleLaps : handleReset;

  return (
    <div className="container">
      <div className="centered__container">
        <div className="timer">{formatTime(laps.elapsedTime)}</div>
        <div className="buttons">
          <Button
            handler={lapResetButtonHandler}
            label={lapResetButtonLabel}
            classButton={lapClass}
            disabled={!laps.isRunning && !laps.elapsedTime}
          />
          <Button
            handler={handleStartStop}
            label={stopStartButtonLabel}
            classButton={stopStartButtonLabel.toLowerCase()} //Would it be better to just have a new variable
          />
        </div>
        <LapsTable
          laps={laps.laps}
          currentLapTime={formatTime(lapTimer)}
          started={laps.elapsedTime > 0}
          best={laps.best}
          worst={laps.worst}
        />
      </div>
    </div>
  );
}

export default App;
