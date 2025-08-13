import { useState, useEffect, useRef } from 'react';

export const useVehicleSimulation = routeData => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [visitedPoints, setVisitedPoints] = useState([]);
  const [speed, setSpeed] = useState(2); // Faster default speed multiplier
  const intervalRef = useRef(null);

  // Get current position
  const currentPosition =
    routeData && routeData.length > 0 ? routeData[currentIndex] : null;

  // Calculate elapsed time (faster intervals)
  const elapsedTime =
    currentPosition && routeData.length > 0
      ? Math.floor((currentIndex * 2) / speed) // 2 seconds per point for faster movement
      : 0;

  // Get actual speed from route data or calculate
  const currentSpeed = currentPosition?.speed || 0;

  // Get current status
  const currentStatus = currentPosition?.status || 'Moving';

  const play = () => {
    setIsPlaying(true);
  };

  const pause = () => {
    setIsPlaying(false);
  };

  const reset = () => {
    setIsPlaying(false);
    setCurrentIndex(0);
    setVisitedPoints([]);
  };

  const setPlaybackSpeed = newSpeed => {
    setSpeed(newSpeed);
  };

  useEffect(() => {
    if (isPlaying && routeData && currentIndex < routeData.length - 1) {
      // Much faster intervals for real-time feel
      const baseInterval = 500; // 500ms base interval
      const adjustedInterval = Math.max(100, baseInterval / speed); // Minimum 100ms for very fast movement

      intervalRef.current = setInterval(() => {
        setCurrentIndex(prev => {
          const next = prev + 1;
          if (next >= routeData.length - 1) {
            setIsPlaying(false);
            return routeData.length - 1;
          }
          return next;
        });
      }, adjustedInterval);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, currentIndex, routeData?.length, speed]); // Only depend on length, not the entire array

  // Update visited points when position changes
  useEffect(() => {
    if (currentPosition && routeData && routeData.length > 0) {
      setVisitedPoints(routeData.slice(0, currentIndex + 1));
    }
  }, [currentIndex, routeData?.length]); // Only depend on length, not the entire array

  return {
    currentPosition,
    visitedPoints,
    isPlaying,
    elapsedTime,
    speed: currentSpeed,
    status: currentStatus,
    playbackSpeed: speed,
    currentIndex,
    totalPoints: routeData ? routeData.length : 0,
    play,
    pause,
    reset,
    setPlaybackSpeed,
    isAtEnd: routeData ? currentIndex >= routeData.length - 1 : false,
  };
};
