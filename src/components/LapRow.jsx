import React from 'react';

const LapRow = ({ lapNumber, lapTime, className }) => {
  return (
    <tr className={className}>
      <td>{`Lap ${lapNumber}`}</td>
      <td>{lapTime}</td>
    </tr>
  );
};

export default LapRow;
