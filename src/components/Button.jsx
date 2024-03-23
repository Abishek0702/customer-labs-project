import React from 'react';
import './Button.css';

const Button = ({ title, onClick, disabled, segmentName }) => {
  let buttonClass = 'button';

  if (title === 'Save the Segment') {
    buttonClass += ` button-save ${segmentName ? "" : "disabled-api-button"}`;
  } else if (title === 'Cancel') {
    buttonClass += ' button-cancel';
  }

  return (
    <button className={`${buttonClass} ${disabled ? "disabled-button" : ""}`} onClick={onClick} disabled={disabled}>
      {title}
    </button>
  );
};

export default Button;