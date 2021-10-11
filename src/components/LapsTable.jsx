import React from 'react';
import EmptyLaps from './EmptyLaps';
import LapRow from './LapRow';
import { formatTime } from '../utils/formatting';

const LapsTable = ({ laps, currentLapTime, started, best, worst }) => {
  return (
    <div className="timer__list">
      <table>
        <tbody>
          {started ? <LapRow lapNumber={laps.length + 1} lapTime={currentLapTime} /> : null}
          {laps.map((lap) => (
            <LapRow
              key={lap.lapNumber}
              lapNumber={lap.lapNumber}
              lapTime={formatTime(lap.lapTime)}
              className={
                lap.lapTime === best && laps.length > 1
                  ? 'best'
                  : lap.lapTime === worst && laps.length > 1
                  ? 'worst'
                  : ''
              }
            />
          ))}
          <EmptyLaps laps={laps} />
        </tbody>
      </table>
    </div>
  );
};

export default LapsTable;
