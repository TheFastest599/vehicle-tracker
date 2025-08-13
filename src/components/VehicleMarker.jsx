import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

// Create custom bus icon
const busIcon = new L.Icon({
  iconUrl:
    'data:image/svg+xml;base64,' +
    btoa(`
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="8" width="24" height="16" rx="2" fill="#FFC107" stroke="#F57F17" stroke-width="2"/>
      <rect x="6" y="10" width="6" height="4" rx="1" fill="#FFF9C4"/>
      <rect x="14" y="10" width="6" height="4" rx="1" fill="#FFF9C4"/>
      <rect x="22" y="10" width="6" height="4" rx="1" fill="#FFF9C4"/>
      <rect x="6" y="16" width="6" height="4" rx="1" fill="#FFF9C4"/>
      <rect x="14" y="16" width="6" height="4" rx="1" fill="#FFF9C4"/>
      <rect x="22" y="16" width="6" height="4" rx="1" fill="#FFF9C4"/>
      <circle cx="10" cy="26" r="2" fill="#424242"/>
      <circle cx="22" cy="26" r="2" fill="#424242"/>
      <rect x="12" y="6" width="8" height="2" rx="1" fill="#F57F17"/>
    </svg>
  `),
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
