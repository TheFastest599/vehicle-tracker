import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from 'react';
import { useVehicleSimulation } from '../hooks/useVehicleSimulationFast';
import * as mainFunctions from '../functions/main-functions';
import gpxFileUrl from '../assets/routes.gpx?url';

// Create the context
const VehicleTrackerContext = createContext();

// Custom hook to use the context
export const useVehicleTracker = () => {
  const context = useContext(VehicleTrackerContext);
  if (!context) {
    throw new Error(
      'useVehicleTracker must be used within a VehicleTrackerProvider'
    );
  }
  return context;
};

// Provider component
export const VehicleTrackerProvider = ({ children }) => {
  // Route and GPX data state
  const [routeData, setRouteData] = useState([]);
  const [rawGpxData, setRawGpxData] = useState([]);
  const [gpxElevationData, setGpxElevationData] = useState([]);
  const [elevationsData, setElevationsData] = useState([0, 100]);

  // Loading state
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [routeLoaded, setRouteLoaded] = useState(false);

  // Playback state
  const [playbackSpeed, setPlaybackSpeed] = useState(1);

  // Vehicle simulation hook
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

  // Handle playback speed changes
  const handleSpeedChange = useCallback(
    newSpeed => {
      setPlaybackSpeed(newSpeed);
      updatePlaybackSpeed(newSpeed);
    },
    [updatePlaybackSpeed]
  );

  // GPX parsing and loading
  const loadGpxData = useCallback(async () => {
    try {
      setIsLoading(true);

      // Simulate loading progress
      const progressInterval = setInterval(() => {
        setLoadingProgress(prev => {
          const newProgress = prev + 10;
          if (newProgress >= 100) {
            clearInterval(progressInterval);
            setIsLoading(false);
          }
          return newProgress;
        });
      }, 100);

      // Parse GPX file
      const parseGpxData = await mainFunctions.parseGpxFile(gpxFileUrl);
      setRawGpxData(parseGpxData);

      // Convert to vehicle route format
      const vehicleRouteData =
        mainFunctions.convertGpxToVehicleRoute(parseGpxData);
      setRouteData(vehicleRouteData);

      // Merge elevations for hotline
      const mergeElevations = await mainFunctions.mergeElevation(parseGpxData);
      setGpxElevationData(mergeElevations);

      // Get the min & max elevation
      const minMaxElevations = await mainFunctions.getMinMaxElevation(
        parseGpxData
      );
      setElevationsData(minMaxElevations);

      setRouteLoaded(true);
    } catch (error) {
      console.error('Error loading GPX data:', error);
      setIsLoading(false);
    }
  }, []);

  // Load GPX data on mount
  useEffect(() => {
    if (!routeLoaded) {
      loadGpxData();
    }
  }, [loadGpxData, routeLoaded]);

  // Reset function that also resets loading state
  const handleReset = useCallback(() => {
    reset();
  }, [reset]);

  // Reload GPX data function
  const reloadGpxData = useCallback(() => {
    setRouteLoaded(false);
    setIsLoading(true);
    setLoadingProgress(0);
    setRouteData([]);
    setRawGpxData([]);
    setGpxElevationData([]);
    setElevationsData([0, 100]);
    loadGpxData();
  }, [loadGpxData]);

  // Context value
  const value = {
    // Route data
    routeData,
    rawGpxData,
    gpxElevationData,
    elevationsData,

    // Loading state
    isLoading,
    loadingProgress,
    routeLoaded,

    // Vehicle simulation data
    currentPosition,
    visitedPoints,
    isPlaying,
    elapsedTime,
    speed,
    status,
    currentIndex,
    totalPoints,
    isAtEnd,

    // Playback controls
    playbackSpeed,
    play,
    pause,
    reset: handleReset,
    onSpeedChange: handleSpeedChange,

    // Utility functions
    reloadGpxData,
  };

  return (
    <VehicleTrackerContext.Provider value={value}>
      {children}
    </VehicleTrackerContext.Provider>
  );
};
