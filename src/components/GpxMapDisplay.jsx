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

// Component to add hotline elevation data to the map
const ElevationHotline = ({ gpxData, elevationsData }) => {
  // Hotline functionality temporarily disabled
  // Will be re-enabled once leaflet-hotline import issues are resolved
  return null;
};

// Icons leaflet
const icon = L.icon({
  iconSize: [25, 41],
  iconAnchor: [10, 41],
  popupAnchor: [2, -40],
  iconUrl: 'https://unpkg.com/leaflet@1.7/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7/dist/images/marker-shadow.png',
});

// Map's params - Default to Bengal College area
const position = [23.5212647, 87.3412147];
const zoom = 13;
const style = { height: '600px' };

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
        <span key={i} className="badge badge-primary mr-2">
          {element.name}
        </span>
      );
    });

    return (
      <div className="mb-4">
        <h2 className="text-lg font-bold mb-2">GPX Route Information</h2>
        <div className="flex flex-wrap gap-2">{tracksName}</div>
        <div className="mt-2 text-sm text-gray-600">
          Total Points: {routeData?.length || 0} | Current:{' '}
          {routeData && currentPosition
            ? routeData.findIndex(p => p === currentPosition) + 1
            : 0}
        </div>
      </div>
    );
  };

  if (isLoading) {
    return <ProgressBar value={loadingProgress} />;
  }

  return (
    <div className="h-screen flex flex-col">
      <div className="p-4 bg-white shadow-md">
        <DisplayTrackList />
      </div>

      <div className="flex-1">
        <MapContainer
          center={position}
          zoom={zoom}
          style={style}
          className="h-full"
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

          {/* Elevation Hotline */}
          <ElevationHotline
            gpxData={gpxElevationData}
            elevationsData={elevationsData}
          />

          <LayersControl position="topright">
            <LayersControl.BaseLayer checked name="Google Satellite">
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
            <LayersControl.BaseLayer name="OpenStreetMap">
              <TileLayer
                attribution={mapViewFormatObj.OpenStreetMapMapnik.attribution}
                url={mapViewFormatObj.OpenStreetMapMapnik.url}
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
  );
};

export default GpxMapDisplay;
