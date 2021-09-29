import React from "react";

const EmptyLaps = ({ laps }) => {
  const emptyRows = new Array(8).fill("");
  laps.forEach((_) => emptyRows.pop());
  return emptyRows.map((_, i) => {
    return (
      <tr key={i}>
        <td> </td>
        <td> </td>
      </tr>
    );
  });
};

export default EmptyLaps;
