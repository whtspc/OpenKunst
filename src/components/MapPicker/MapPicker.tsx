import { MapContainer, TileLayer } from 'react-leaflet';
import { LocationMarker } from './LocationMarker';
import 'leaflet/dist/leaflet.css';
import './MapPicker.css';

interface MapPickerProps {
  location: { lat: number; lng: number } | null;
  onLocationSelect: (lat: number, lng: number) => void;
  defaultCenter?: { lat: number; lng: number };
  height?: number;
  readOnly?: boolean;
}

// Default center: Amsterdam
const DEFAULT_CENTER = { lat: 52.3676, lng: 4.9041 };

export function MapPicker({
  location,
  onLocationSelect,
  defaultCenter = DEFAULT_CENTER,
  height = 250,
  readOnly = false,
}: MapPickerProps) {
  const center = location || defaultCenter;

  return (
    <div className="map-picker">
      <MapContainer
        center={[center.lat, center.lng]}
        zoom={13}
        style={{ height: `${height}px`, width: '100%' }}
        className="map-picker__map"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker
          position={location}
          onPositionChange={onLocationSelect}
          readOnly={readOnly}
        />
      </MapContainer>
      {!readOnly && (
        <p className="map-picker__hint">
          Click on the map to place a marker, then drag to adjust
        </p>
      )}
    </div>
  );
}
