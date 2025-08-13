import React from 'react';

const ProgressBar = ({ value }) => {
  return (
    <div className="card bg-base-100 shadow-xl w-96 max-w-sm mx-auto">
      <div className="card-body items-center text-center">
        <div className="text-4xl mb-4">🚌</div>
        <h3 className="card-title">Loading GPX Route</h3>
        <p className="text-base-content/70 mb-4">Parsing GPS track data...</p>

        <div className="w-full">
          <div className="flex justify-between text-sm mb-2">
            <span>Progress</span>
            <span className="font-mono">{value}%</span>
          </div>
          <progress
            className="progress progress-primary w-full h-3"
            value={value}
            max="100"
          ></progress>
        </div>

        <div className="flex gap-2 mt-4">
          <div className="badge badge-primary badge-sm">GPX</div>
          <div className="badge badge-secondary badge-sm">Real-time</div>
          <div className="badge badge-accent badge-sm">264 Points</div>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
