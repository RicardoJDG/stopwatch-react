import React, { useState, useEffect } from "react";
import "./App.css";

import LapsTable from "./components/LapsTable";
import Button from "./components/Button";

import { useTimer } from "./hooks/useTimer";
import { formatTime } from "./utils/formatting";

function App() {
  const initialBestAndWorstState = {
    best: Number.POSITIVE_INFINITY,
    worst: Number.NEGATIVE_INFINITY,
  };
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState([]);
  const [bestAndWorst, setBestAndWorst] = useState(initialBestAndWorstState);

  const mainTimer = useTimer(isRunning);
  const lapTimer = useTimer(isRunning);

  const stopStartButtonLabel = isRunning ? "Stop" : "Start";
  const lapResetButtonLabel = isRunning ? "Lap" : "Reset";

  const handleStartStop = () => {
    setIsRunning((isRunning) => !isRunning);
  };

  const handleLaps = () => {
    setLaps([
      { lapNumber: laps.length + 1, lapTime: lapTimer.elapsedTime },
      ...laps,
    ]);
    getBestAndWorst();
    lapTimer.resetTimer();
  };

  const getBestAndWorst = () => {
    if (lapTimer.elapsedTime > bestAndWorst.worst) {
      setBestAndWorst((prevState) => ({
        ...prevState,
        worst: lapTimer.elapsedTime,
      }));
    }
    if (lapTimer.elapsedTime < bestAndWorst.best) {
      setBestAndWorst((prevState) => ({
        ...prevState,
        best: lapTimer.elapsedTime,
      }));
    }
  };

  const handleReset = () => {
    mainTimer.resetTimer();
    lapTimer.resetTimer();
    setBestAndWorst(initialBestAndWorstState);
    setLaps([]);
  };

  const lapResetButtonHandler = isRunning ? handleLaps : handleReset;

  return (
    <div className="container">
      <div className="centered__container">
        <p className="timer">{formatTime(mainTimer.elapsedTime)}</p>
        <div className="buttons">
          <Button
            handler={lapResetButtonHandler}
            label={lapResetButtonLabel}
            classButton="lap"
          />
          <Button
            handler={handleStartStop}
            label={stopStartButtonLabel}
            classButton={stopStartButtonLabel.toLowerCase()}
          />
        </div>
        <LapsTable
          laps={laps}
          currentLapTime={formatTime(lapTimer.elapsedTime)}
          started={mainTimer.elapsedTime > 0}
          bestAndWorst={bestAndWorst}
        />
      </div>
    </div>
  );
}

export default App;
