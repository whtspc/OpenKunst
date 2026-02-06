import { useState, useCallback } from 'react';

export interface GPSLocation {
  lat: number;
  lng: number;
}

export type GPSStatus = 'idle' | 'capturing' | 'success' | 'error' | 'manual';

interface UseGPSCaptureResult {
  location: GPSLocation | null;
  status: GPSStatus;
  accuracy: number | null;
  error: string | null;
  captureGPS: () => Promise<void>;
  setManualLocation: (lat: number, lng: number) => void;
  reset: () => void;
}

const GPS_TIMEOUT = 10000; // 10 seconds
const MAX_AGE = 60000; // 1 minute
const HIGH_ACCURACY = true;

export function useGPSCapture(): UseGPSCaptureResult {
  const [location, setLocation] = useState<GPSLocation | null>(null);
  const [status, setStatus] = useState<GPSStatus>('idle');
  const [accuracy, setAccuracy] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const captureGPS = useCallback(async () => {
    if (!navigator.geolocation) {
      setStatus('error');
      setError('Geolocation is not supported by your browser');
      return;
    }

    setStatus('capturing');
    setError(null);

    return new Promise<void>((resolve) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          setAccuracy(position.coords.accuracy);
          setStatus('success');
          resolve();
        },
        (err) => {
          let errorMessage = 'Failed to get location';
          switch (err.code) {
            case err.PERMISSION_DENIED:
              errorMessage = 'Location permission denied. Please enable location access.';
              break;
            case err.POSITION_UNAVAILABLE:
              errorMessage = 'Location unavailable. Please try again.';
              break;
            case err.TIMEOUT:
              errorMessage = 'Location request timed out. Please try again.';
              break;
          }
          setError(errorMessage);
          setStatus('error');
          resolve();
        },
        {
          enableHighAccuracy: HIGH_ACCURACY,
          timeout: GPS_TIMEOUT,
          maximumAge: MAX_AGE,
        }
      );
    });
  }, []);

  const setManualLocation = useCallback((lat: number, lng: number) => {
    setLocation({ lat, lng });
    setAccuracy(null);
    setStatus('manual');
    setError(null);
  }, []);

  const reset = useCallback(() => {
    setLocation(null);
    setStatus('idle');
    setAccuracy(null);
    setError(null);
  }, []);

  return {
    location,
    status,
    accuracy,
    error,
    captureGPS,
    setManualLocation,
    reset,
  };
}
