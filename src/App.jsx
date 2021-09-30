import React, { useState } from "react";
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
  const { elapsedTime, resetTimer } = useTimer(isRunning);
  const lapsSum = laps.reduce((acc, lap) => acc + lap.lapTime, 0);
  const lapTimer = elapsedTime - lapsSum;

  const stopStartButtonLabel = isRunning ? "Stop" : "Start";
  const lapResetButtonLabel = isRunning ? "Lap" : "Reset";

  const handleStartStop = () => {
    setIsRunning((isRunning) => !isRunning);
  };

  const handleLaps = () => {
    setLaps([{ lapNumber: laps.length + 1, lapTime: lapTimer }, ...laps]);
    getBestAndWorst();
  };

  const getBestAndWorst = () => {
    if (lapTimer > bestAndWorst.worst) {
      setBestAndWorst((prevState) => ({
        ...prevState,
        worst: lapTimer,
      }));
    }
    if (lapTimer < bestAndWorst.best) {
      setBestAndWorst((prevState) => ({
        ...prevState,
        best: lapTimer,
      }));
    }
  };

  const handleReset = () => {
    resetTimer();
    setBestAndWorst(initialBestAndWorstState);
    setLaps([]);
  };

  const lapResetButtonHandler =
    isRunning && elapsedTime ? handleLaps : handleReset;

  return (
    <div className="container">
      <div className="centered__container">
        <p className="timer">{formatTime(elapsedTime)}</p>
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
          currentLapTime={formatTime(lapTimer)}
          started={elapsedTime > 0}
          bestAndWorst={bestAndWorst}
        />
      </div>
    </div>
  );
}

export default App;
