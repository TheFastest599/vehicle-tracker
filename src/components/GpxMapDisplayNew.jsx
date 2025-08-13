import React, { useEffect, useState } from 'react';

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
  useMap,
} from 'react-leaflet';

// GPX file URL
import gpxFileUrl from '../assets/routes.gpx?url';

// Progress bar
import ProgressBar from './progress-bar';

// Main functions
import * as mainFunctions from '../functions/main-functions';

// Vehicle components
import VehicleMarker from './VehicleMarker';

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
const GpxMapDisplay = ({
  onRouteLoaded,
  currentPosition,
  visitedPoints,
  fullRoute,
  isPlaying,
}) => {
  // States
  const [loading, setLoading] = useState(true);
  const [value, updateValue] = useState(0);
  const [gpxData, setGpxData] = useState([]);
  const [rawdata, setRawData] = useState([]);
  const [elevationsData, setElevationsData] = useState([0, 100]);

  // Side effects
  useEffect(() => {
    // Progress bar
    const interval = setInterval(() => {
      updateValue(oldValue => {
        const newValue = oldValue + 10;
        if (newValue >= 100) {
          clearInterval(interval);
          setLoading(false);
        }
        return newValue;
      });
    }, 100);

    const parseGpx = async () => {
      try {
        // Parse gpx function
        const parseGpxData = await mainFunctions.parseGpxFile(gpxFileUrl);
        setRawData(parseGpxData);

        // Convert to vehicle route format
        const vehicleRouteData =
          mainFunctions.convertGpxToVehicleRoute(parseGpxData);

        // Pass route data to parent component
        if (onRouteLoaded) {
          onRouteLoaded(vehicleRouteData);
        }

        // Merge elevations for hotline
        const mergeElevations = await mainFunctions.mergeElevation(
          parseGpxData
        );
        setGpxData(mergeElevations);

        // Get the min & the max elevation
        const minMaxElevations = await mainFunctions.getMinMaxElevation(
          parseGpxData
        );
        setElevationsData(minMaxElevations);
      } catch (error) {
        console.error('Error loading GPX data:', error);
      }
    };

    parseGpx();

    return () => clearInterval(interval);
  }, [onRouteLoaded]);

  // Display tracks list
  const DisplayTrackList = () => {
    let tracksName = rawdata.map((element, i) => {
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
          Total Points: {fullRoute?.length || 0} | Current:{' '}
          {fullRoute && currentPosition
            ? fullRoute.findIndex(p => p === currentPosition) + 1
            : 0}
        </div>
      </div>
    );
  };

  if (loading) {
    return <ProgressBar value={value} />;
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
          {fullRoute && fullRoute.length > 0 && (
            <Polyline
              pathOptions={{
                fillColor: 'blue',
                color: 'blue',
                weight: 3,
                opacity: 0.7,
              }}
              positions={fullRoute.map(point => [
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
          <ElevationHotline gpxData={gpxData} elevationsData={elevationsData} />

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
