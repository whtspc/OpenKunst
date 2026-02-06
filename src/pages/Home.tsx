import { useState, useEffect, useCallback } from 'react';
import { useSculptures } from '../hooks/useSculptures';
import type { SculptureWithDistance } from '../types/Sculpture';
import type { UserLocation } from '../utils/geolocation';
import { getCurrentLocation, addDistanceAndSort } from '../utils/geolocation';
import { Header } from '../components/Header';
import { SculptureFeed } from '../components/SculptureFeed';
import { SculptureDetail } from '../components/SculptureDetail';
import { QuickSubmitFAB } from '../components/QuickSubmitFAB';

type LocationStatus = 'loading' | 'granted' | 'denied' | 'unavailable';

export function Home() {
  const { sculptures, loading: sculpturesLoading, error: sculpturesError } = useSculptures();
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
  const [locationStatus, setLocationStatus] = useState<LocationStatus>('unavailable');
  const [sortedSculptures, setSortedSculptures] = useState<SculptureWithDistance[]>([]);
  const [selectedSculpture, setSelectedSculpture] = useState<SculptureWithDistance | null>(null);

  const requestLocation = useCallback(async () => {
    setLocationStatus('loading');
    try {
      const location = await getCurrentLocation();
      setUserLocation(location);
      setLocationStatus('granted');
    } catch {
      setLocationStatus('denied');
    }
  }, []);

  useEffect(() => {
    requestLocation();
  }, [requestLocation]);

  useEffect(() => {
    const sorted = addDistanceAndSort(sculptures, userLocation);
    setSortedSculptures(sorted);
  }, [userLocation, sculptures]);

  const handleSelectSculpture = (sculpture: SculptureWithDistance) => {
    setSelectedSculpture(sculpture);
  };

  const handleCloseDetail = () => {
    setSelectedSculpture(null);
  };

  if (sculpturesLoading) {
    return (
      <div className="app">
        <Header locationStatus={locationStatus} onRequestLocation={requestLocation} />
        <div className="app__loading">
          <p>Loading sculptures...</p>
        </div>
      </div>
    );
  }

  if (sculpturesError) {
    return (
      <div className="app">
        <Header locationStatus={locationStatus} onRequestLocation={requestLocation} />
        <div className="app__error">
          <p>Failed to load sculptures</p>
          <p className="app__error-detail">{sculpturesError.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <Header locationStatus={locationStatus} onRequestLocation={requestLocation} />

      <SculptureFeed
        sculptures={sortedSculptures}
        onSelectSculpture={handleSelectSculpture}
      />

      {selectedSculpture && (
        <SculptureDetail
          sculpture={selectedSculpture}
          onClose={handleCloseDetail}
        />
      )}

      <QuickSubmitFAB />
    </div>
  );
}
