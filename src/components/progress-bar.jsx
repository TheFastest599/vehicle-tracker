import React from 'react';
import '../css/map.css';

const ProgressBar = ({ value }) => {
  return (
    <div className="progress-bar-container">
      <div className="loading-text">Loading GPX Data...</div>
      <div className="progress-bar">
        <div className="progress-bar-fill" style={{ width: `${value}%` }}></div>
      </div>
      <div className="loading-text">{value}%</div>
    </div>
  );
};

export default ProgressBar;
