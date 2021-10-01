import React from 'react';

const Button = ({ handler, label, classButton }) => {
  return (
    <button onClick={handler} className={`roundBtn ${classButton}`}>
      {label}
    </button>
  );
};

export default Button;
