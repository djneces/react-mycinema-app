import React from 'react';
import './CustomBtnFull.scss';

const CustomBtnFull = ({ children, onclick, width, disabled }) => {
  return (
    <div
      className={`CustomBtnFull ${width === 'w30' ? 'w-30' : ''} ${
        disabled ? 'disabled' : ''
      }`}
      onClick={onclick}
    >
      <div>{children}</div>
    </div>
  );
};

export default CustomBtnFull;
