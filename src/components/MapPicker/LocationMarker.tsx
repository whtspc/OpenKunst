import { useEffect, useMemo } from 'react';
import { Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';

// Fix for default Leaflet marker icon not displaying (common bundler issue)
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

const defaultIcon = L.icon({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

interface LocationMarkerProps {
  position: { lat: number; lng: number } | null;
  onPositionChange: (lat: number, lng: number) => void;
  readOnly?: boolean;
}

export function LocationMarker({
  position,
  onPositionChange,
  readOnly = false,
}: LocationMarkerProps) {
  const map = useMapEvents({
    click(e) {
      if (!readOnly) {
        onPositionChange(e.latlng.lat, e.latlng.lng);
      }
    },
  });

  // Center map on position when it changes
  useEffect(() => {
    if (position) {
      map.flyTo([position.lat, position.lng], map.getZoom());
    }
  }, [position, map]);

  const eventHandlers = useMemo(
    () => ({
      dragend(e: L.DragEndEvent) {
        const marker = e.target as L.Marker;
        const pos = marker.getLatLng();
        onPositionChange(pos.lat, pos.lng);
      },
    }),
    [onPositionChange]
  );

  if (!position) return null;

  return (
    <Marker
      position={[position.lat, position.lng]}
      icon={defaultIcon}
      draggable={!readOnly}
      eventHandlers={eventHandlers}
    />
  );
}
