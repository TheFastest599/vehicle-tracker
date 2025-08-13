import React from 'react';

// CSS
import '../css/map.css';

// Leaflet Map App
import 'leaflet/dist/leaflet.css';
import * as L from 'leaflet';
import {
  MapContainer,
  TileLayer,
  Polyline,
  LayersControl,
} from 'react-leaflet';

// Progress bar
import ProgressBar from './progress-bar';

// Vehicle components
import VehicleMarker from './VehicleMarker';

// Context
import { useVehicleTracker } from '../context/VehicleTrackerContext';

// Map's params - Default to Bengal College area
const position = [23.5212647, 87.3412147];
const zoom = 13;
const style = {
  height: '100%',
  minHeight: '60vh',
  borderRadius: '12px',
  overflow: 'hidden',
};

const mapViewFormatObj = {
  GoogleSatellite: {
    formatName: 'Google Satellite',
    url: 'https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',
    attribution: '&copy; Google',
  },
  GoogleHybrid: {
    formatName: 'Google Hybrid',
    url: 'https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}',
    attribution: '&copy; Google',
  },
  OpenStreetMapMapnik: {
    formatName: 'OpenStreetMap',
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution:
      '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
  },
  OpenTopoMap: {
    formatName: 'OpenTopoMap',
    url: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
    attribution:
      'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a>',
  },
};

// GPX MAP DISPLAY COMPONENT
const GpxMapDisplay = () => {
  const {
    isLoading,
    loadingProgress,
    rawGpxData,
    gpxElevationData,
    elevationsData,
    currentPosition,
    visitedPoints,
    routeData,
    isPlaying,
  } = useVehicleTracker();

  // Display tracks list
  const DisplayTrackList = () => {
    let tracksName = rawGpxData.map((element, i) => {
      return (
        <span className="text-sm mx-4" key={i}>
          {element.name}
        </span>
      );
    });

    return (
      <div className="card  mb-4">
        <div className="card-body p-4">
          <h3 className="card-title text-base flex items-center gap-2">
            <div className="w-3 h-3 bg-primary rounded-full"></div>
            Route Information
          </h3>
          <div className="flex flex-wrap gap-2 mb-1">{tracksName}</div>
          <div className="stats stats-horizontal bg-base-200/50 rounded-lg">
            <div className="stat py-2 px-4">
              <div className="stat-title text-xs">Total Points</div>
              <div className="stat-value text-lg text-primary">
                {routeData?.length || 0}
              </div>
            </div>
            <div className="stat py-2 px-4">
              <div className="stat-title text-xs">Current Point</div>
              <div className="stat-value text-lg text-secondary">
                {routeData && currentPosition
                  ? routeData.findIndex(p => p === currentPosition) + 1
                  : 0}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body items-center text-center">
            <div className="loading loading-spinner loading-lg text-primary"></div>
            <h3 className="card-title">Loading GPX Route...</h3>
            <ProgressBar value={loadingProgress} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <div className="p-0">
        <DisplayTrackList />
      </div>

      <div className="flex-1 mx-4 pb-4">
        <div className="h-full rounded-xl overflow-hidden ">
          <MapContainer
            center={position}
            zoom={zoom}
            style={style}
            className="h-full w-full"
          >
            {/* Route Polyline */}
            {routeData && routeData.length > 0 && (
              <Polyline
                pathOptions={{
                  fillColor: 'blue',
                  color: 'blue',
                  weight: 3,
                  opacity: 0.7,
                }}
                positions={routeData.map(point => [
                  point.latitude,
                  point.longitude,
                ])}
              />
            )}

            {/* Visited Route */}
            {visitedPoints && visitedPoints.length > 0 && (
              <Polyline
                pathOptions={{
                  fillColor: 'red',
                  color: 'red',
                  weight: 4,
                  opacity: 0.8,
                }}
                positions={visitedPoints.map(point => [
                  point.latitude,
                  point.longitude,
                ])}
              />
            )}

            {/* Vehicle Marker */}
            {currentPosition && (
              <VehicleMarker position={currentPosition} isMoving={isPlaying} />
            )}

            <LayersControl position="topright">
              <LayersControl.BaseLayer checked name="OpenStreetMap">
                <TileLayer
                  attribution={mapViewFormatObj.OpenStreetMapMapnik.attribution}
                  url={mapViewFormatObj.OpenStreetMapMapnik.url}
                />
              </LayersControl.BaseLayer>
              <LayersControl.BaseLayer name="Google Satellite">
                <TileLayer
                  attribution={mapViewFormatObj.GoogleSatellite.attribution}
                  url={mapViewFormatObj.GoogleSatellite.url}
                />
              </LayersControl.BaseLayer>
              <LayersControl.BaseLayer name="Google Hybrid">
                <TileLayer
                  attribution={mapViewFormatObj.GoogleHybrid.attribution}
                  url={mapViewFormatObj.GoogleHybrid.url}
                />
              </LayersControl.BaseLayer>

              <LayersControl.BaseLayer name="OpenTopoMap">
                <TileLayer
                  attribution={mapViewFormatObj.OpenTopoMap.attribution}
                  url={mapViewFormatObj.OpenTopoMap.url}
                />
              </LayersControl.BaseLayer>
            </LayersControl>
          </MapContainer>
        </div>
      </div>
    </div>
  );
};

export default GpxMapDisplay;
