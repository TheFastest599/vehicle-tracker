import { MapContainer as LeafletMap, TileLayer } from 'react-leaflet';
import VehicleMarker from './VehicleMarker';
import RoutePolyline from './RoutePolyline';

const MapContainer = ({
  center,
  zoom = 15,
  currentPosition,
  visitedPoints,
  fullRoute,
  isPlaying,
}) => {
  return (
    <div className="h-full w-full rounded-lg overflow-hidden shadow-lg">
      <LeafletMap
        center={center}
        zoom={zoom}
        style={{ height: '100%', width: '100%' }}
        className="z-0"
      >
        {/* Google Satellite tiles */}
        <TileLayer
          attribution='&copy; <a href="https://www.google.com/maps">Google Maps</a>'
          url="https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"
          maxZoom={20}
        />

        {/* Google hybrid overlay (roads + labels on satellite) */}
        <TileLayer
          attribution=""
          url="https://mt1.google.com/vt/lyrs=h&x={x}&y={y}&z={z}"
          maxZoom={20}
          opacity={0.8}
        />

        {/* Route polylines */}
        {fullRoute && fullRoute.length > 0 && (
          <RoutePolyline visitedPoints={visitedPoints} fullRoute={fullRoute} />
        )}

        {/* Vehicle marker */}
        {currentPosition && (
          <VehicleMarker position={currentPosition} isPlaying={isPlaying} />
        )}
      </LeafletMap>
    </div>
  );
};

export default MapContainer;
