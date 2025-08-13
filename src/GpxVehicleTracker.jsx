import React, { useState, useCallback } from 'react';
import GpxMapDisplay from './components/GpxMapDisplay';
import { useVehicleSimulation } from './hooks/useVehicleSimulationFast';
import Controls from './components/Controls';
import './App.css';

function GpxVehicleTracker() {
  const [routeData, setRouteData] = useState([]);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [routeLoaded, setRouteLoaded] = useState(false);

  const {
    currentPosition,
    visitedPoints,
    isPlaying,
    elapsedTime,
    speed,
    status,
    playbackSpeed: currentPlaybackSpeed,
    currentIndex,
    totalPoints,
    play,
    pause,
    reset,
    setPlaybackSpeed: updatePlaybackSpeed,
    isAtEnd,
  } = useVehicleSimulation(routeData);

  const handleSpeedChange = newSpeed => {
    setPlaybackSpeed(newSpeed);
    updatePlaybackSpeed(newSpeed);
  };

  const handleRouteLoaded = useCallback((newRouteData) => {
    // Only set route data if it hasn't been loaded yet
    if (!routeLoaded && newRouteData && newRouteData.length > 0) {
      setRouteData(newRouteData);
      setRouteLoaded(true);
    }
  }, [routeLoaded]);

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
            onSpeedChange={handleSpeedChange}
            currentIndex={currentIndex}
            totalPoints={totalPoints}
            isAtEnd={isAtEnd}
          />
        </div>

        {/* Map Panel */}
        <div className="lg:col-span-3">
          <GpxMapDisplay
            onRouteLoaded={handleRouteLoaded}
            currentPosition={currentPosition}
            visitedPoints={visitedPoints}
            fullRoute={routeData}
            isPlaying={isPlaying}
          />
        </div>
      </div>
    </div>
  );
}

export default GpxVehicleTracker;
