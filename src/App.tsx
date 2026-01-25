import { useState, useEffect, useCallback } from 'react';
import { sculptures } from './data/sculptures';
import { getArtistByName } from './data/artists';
import type { SculptureWithDistance } from './types/Sculpture';
import type { Artist } from './types/Artist';
import type { UserLocation } from './utils/geolocation';
import { getCurrentLocation, addDistanceAndSort } from './utils/geolocation';
import { Header } from './components/Header';
import { SculptureFeed } from './components/SculptureFeed';
import { SculptureDetail } from './components/SculptureDetail';
import { ArtistProfile } from './components/ArtistProfile';
import './App.css';

type LocationStatus = 'loading' | 'granted' | 'denied' | 'unavailable';

function App() {
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
  const [locationStatus, setLocationStatus] =
    useState<LocationStatus>('unavailable');
  const [sortedSculptures, setSortedSculptures] = useState<
    SculptureWithDistance[]
  >([]);
  const [selectedSculpture, setSelectedSculpture] =
    useState<SculptureWithDistance | null>(null);
  const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null);

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

  // Request location on mount
  useEffect(() => {
    requestLocation();
  }, [requestLocation]);

  // Sort sculptures when location changes
  useEffect(() => {
    const sorted = addDistanceAndSort(sculptures, userLocation);
    setSortedSculptures(sorted);
  }, [userLocation]);

  const handleSelectSculpture = (sculpture: SculptureWithDistance) => {
    setSelectedSculpture(sculpture);
  };

  const handleCloseDetail = () => {
    setSelectedSculpture(null);
  };

  const handleSelectArtist = (artistName: string) => {
    const artist = getArtistByName(artistName);
    if (artist) {
      setSelectedArtist(artist);
    }
  };

  const handleCloseArtist = () => {
    setSelectedArtist(null);
  };

  const handleSelectSculptureFromArtist = (sculpture: SculptureWithDistance) => {
    setSelectedArtist(null);
    setSelectedSculpture(sculpture);
  };

  return (
    <div className="app">
      <Header
        locationStatus={locationStatus}
        onRequestLocation={requestLocation}
      />

      <SculptureFeed
        sculptures={sortedSculptures}
        onSelectSculpture={handleSelectSculpture}
      />

      {selectedSculpture && (
        <SculptureDetail
          sculpture={selectedSculpture}
          onClose={handleCloseDetail}
          onSelectArtist={handleSelectArtist}
        />
      )}

      {selectedArtist && (
        <ArtistProfile
          artist={selectedArtist}
          sculptures={sortedSculptures}
          onClose={handleCloseArtist}
          onSelectSculpture={handleSelectSculptureFromArtist}
        />
      )}
    </div>
  );
}

export default App;
