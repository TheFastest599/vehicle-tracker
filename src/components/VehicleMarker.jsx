import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

// Create custom bus icon using PNG image
const busIcon = new L.Icon({
  iconUrl: '/bus.png',
  iconSize: [32, 32],
  iconAnchor: [16, 16],
  popupAnchor: [0, -16],
});

const VehicleMarker = ({ position, isPlaying }) => {
  if (!position) return null;

  return (
    <Marker position={[position.latitude, position.longitude]} icon={busIcon}>
      <Popup>
        <div className="text-sm">
          <div className="font-bold text-yellow-600 mb-2">🚌 School Bus</div>
          <div>
            <strong>Location:</strong>
          </div>
          <div>Lat: {position.latitude.toFixed(6)}</div>
          <div>Lng: {position.longitude.toFixed(6)}</div>
          <div className="mt-2">
            <strong>Speed:</strong> {position.speed || 0} km/h
          </div>
          <div>
            <strong>Status:</strong> {position.status || 'Moving'}
          </div>
          <div className="mt-2">
            <strong>Movement:</strong> {isPlaying ? '🟢 Active' : '🔴 Stopped'}
          </div>
          <div className="text-xs text-gray-500 mt-2">
            <strong>Time:</strong>{' '}
            {new Date(position.timestamp).toLocaleString()}
          </div>
        </div>
      </Popup>
    </Marker>
  );
};

export default VehicleMarker;
