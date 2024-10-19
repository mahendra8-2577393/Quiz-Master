// components/ProgressBar.js
import React from 'react';

const ProgressBar = ({ current, total }) => {
  const progress = (current / total) * 100;
  return (
    <div>
      <div style={{ width: `${progress}%`, backgroundColor: 'green', height: '10px' }} />
      <p>{`Question ${current} of ${total}`}</p>
    </div>
  );
};

export default ProgressBar;
