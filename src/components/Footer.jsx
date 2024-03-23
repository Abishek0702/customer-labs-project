import React from 'react';
import Button from './Button';

const Footer = ({ handleButtonClick, segmentName }) => {
  return (
    <div className="footer">
      <Button title="Save the Segment"  onClick={() => handleButtonClick("Save the Segment")} segmentName={segmentName}/>
      <Button title="Cancel" onClick={() => handleButtonClick("Cancel")} />
    </div>
  );
};

export default Footer;