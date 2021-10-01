import React from 'react';
import EmptyLaps from './EmptyLaps';
import { formatTime } from '../utils/formatting';

const LapsTable = ({ laps, currentLapTime, started, bestAndWorst: { best, worst } }) => {
  return (
    <div className="timer__list">
      <table>
        <tbody>
          {started ? (
            <tr>
              <td>{`Lap ${laps.length + 1}`}</td>
              <td>{currentLapTime}</td>
            </tr>
          ) : null}
          {laps.map((lap) => (
            <tr
              key={lap.lapNumber}
              className={
                lap.lapTime === best && laps.length > 1
                  ? 'best'
                  : lap.lapTime === worst && laps.length > 1
                  ? 'worst'
                  : ''
              }
            >
              <td>{`Lap ${lap.lapNumber}`}</td>
              <td>{formatTime(lap.lapTime)}</td>
            </tr>
          ))}
          <EmptyLaps laps={laps} />
        </tbody>
      </table>
    </div>
  );
};

export default LapsTable;
