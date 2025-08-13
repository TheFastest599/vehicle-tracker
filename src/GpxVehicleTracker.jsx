import React from 'react';
import GpxMapDisplay from './components/GpxMapDisplay';
import Controls from './components/Controls';
import {
  VehicleTrackerProvider,
  useVehicleTracker,
} from './context/VehicleTrackerContext';
import './App.css';

const GpxVehicleTrackerContent = () => {
  const {
    currentPosition,
    visitedPoints,
    isPlaying,
    elapsedTime,
    speed,
    status,
    playbackSpeed,
    currentIndex,
    totalPoints,
    play,
    pause,
    reset,
    onSpeedChange,
    isAtEnd,
    routeData,
  } = useVehicleTracker();

  return (
    <div className="App">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 h-screen">
        {/* Controls Panel */}
        <div className="lg:col-span-1">
          <Controls
            isPlaying={isPlaying}
            onPlay={play}
            onPause={pause}
            onReset={reset}
            currentPosition={currentPosition}
            elapsedTime={elapsedTime}
            speed={speed || currentPosition?.speed || 0}
            status={status || currentPosition?.status || 'Ready'}
            playbackSpeed={playbackSpeed}
            onSpeedChange={onSpeedChange}
            currentIndex={currentIndex}
            totalPoints={totalPoints}
            isAtEnd={isAtEnd}
          />
        </div>

        {/* Map Panel */}
        <div className="lg:col-span-3">
          <GpxMapDisplay
            currentPosition={currentPosition}
            visitedPoints={visitedPoints}
            fullRoute={routeData}
            isPlaying={isPlaying}
          />
        </div>
      </div>
    </div>
  );
};

function GpxVehicleTracker() {
  return (
    <VehicleTrackerProvider>
      <GpxVehicleTrackerContent />
    </VehicleTrackerProvider>
  );
}

export default GpxVehicleTracker;
