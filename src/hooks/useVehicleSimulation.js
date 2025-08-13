import { useState, useEffect, useRef } from 'react';

export const useVehicleSimulation = routeData => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [visitedPoints, setVisitedPoints] = useState([]);
  const [speed, setSpeed] = useState(1); // Speed multiplier
  const intervalRef = useRef(null);

  // Get current position
  const currentPosition =
    routeData && routeData.length > 0 ? routeData[currentIndex] : null;

  // Calculate elapsed time
  const elapsedTime =
    currentPosition && routeData.length > 0
      ? Math.floor((currentIndex * 5) / speed) // 5 seconds per point
      : 0;

  // Calculate speed (km/h approximation)
  const calculateSpeed = () => {
    if (currentIndex < 1 || !routeData) return 0;

    const prev = routeData[currentIndex - 1];
    const curr = routeData[currentIndex];

    // Simple distance calculation (not precise, but good for demo)
    const distance =
      Math.sqrt(
        Math.pow(curr.latitude - prev.latitude, 2) +
          Math.pow(curr.longitude - prev.longitude, 2)
      ) * 111000; // Rough conversion to meters

    return ((distance / 5) * 3.6).toFixed(1); // Convert to km/h
  };

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
      intervalRef.current = setInterval(() => {
        setCurrentIndex(prev => {
          const next = prev + 1;
          if (next >= routeData.length - 1) {
            setIsPlaying(false);
            return routeData.length - 1;
          }
          return next;
        });
      }, 3000 / speed); // Adjust interval based on speed
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
  }, [isPlaying, currentIndex, routeData, speed]);

  // Update visited points when position changes
  useEffect(() => {
    if (currentPosition && routeData) {
      setVisitedPoints(routeData.slice(0, currentIndex + 1));
    }
  }, [currentIndex, currentPosition, routeData]);

  return {
    currentPosition,
    visitedPoints,
    isPlaying,
    elapsedTime,
    speed: calculateSpeed(),
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
