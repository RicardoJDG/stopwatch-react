import React from 'react';

const EmptyLaps = ({ laps }) => {
  const emptyRows = new Array(6).fill('');
  laps.forEach((_) => emptyRows.pop());
  return emptyRows.map((_, i) => {
    return (
      <tr height={'53.57px'} key={i}>
        <td> </td>
        <td> </td>
      </tr>
    );
  });
};

export default EmptyLaps;
