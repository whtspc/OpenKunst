import type { Artist } from '../types/Artist';
import type { SculptureWithDistance } from '../types/Sculpture';
import { formatDistance } from '../utils/geolocation';
import './ArtistProfile.css';

interface ArtistProfileProps {
  artist: Artist;
  sculptures: SculptureWithDistance[];
  onClose: () => void;
  onSelectSculpture: (sculpture: SculptureWithDistance) => void;
}

export function ArtistProfile({ artist, sculptures, onClose, onSelectSculpture }: ArtistProfileProps) {
  // Filter sculptures by this artist
  const artistSculptures = sculptures.filter(
    s => s.artist.toLowerCase() === artist.name.toLowerCase()
  );

  const lifespan = artist.birthYear
    ? artist.deathYear
      ? `${artist.birthYear} - ${artist.deathYear}`
      : `Geboren ${artist.birthYear}`
    : null;

  return (
    <div className="artist-profile">
      <header className="artist-profile__header">
        <button className="artist-profile__back" onClick={onClose}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Terug
        </button>
      </header>

      <div className="artist-profile__content">
        {artist.image && (
          <div className="artist-profile__image-container">
            <img
              src={artist.image}
              alt={artist.name}
              className="artist-profile__image"
            />
          </div>
        )}

        <div className="artist-profile__info">
          <h1 className="artist-profile__name">{artist.name}</h1>

          <div className="artist-profile__meta">
            {lifespan && (
              <span className="artist-profile__lifespan">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                {lifespan}
              </span>
            )}
            <span className="artist-profile__nationality">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <line x1="2" y1="12" x2="22" y2="12" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
              {artist.nationality}
            </span>
          </div>

          <section className="artist-profile__section">
            <h2>Biografie</h2>
            <p>{artist.bio}</p>
          </section>

          {artist.website && (
            <a
              href={artist.website}
              target="_blank"
              rel="noopener noreferrer"
              className="artist-profile__website"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
              Bezoek website
            </a>
          )}

          <section className="artist-profile__section">
            <h2>Werken in de buurt ({artistSculptures.length})</h2>
            <div className="artist-profile__sculptures">
              {artistSculptures.map(sculpture => (
                <button
                  key={sculpture.id}
                  className="artist-profile__sculpture-card"
                  onClick={() => onSelectSculpture(sculpture)}
                >
                  <img
                    src={sculpture.images[0]}
                    alt={sculpture.name}
                    className="artist-profile__sculpture-image"
                    loading="lazy"
                  />
                  <div className="artist-profile__sculpture-info">
                    <h3 className="artist-profile__sculpture-name">{sculpture.name}</h3>
                    <p className="artist-profile__sculpture-location">
                      {sculpture.location.address}, {sculpture.location.city}
                    </p>
                    <span className="artist-profile__sculpture-distance">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                      {formatDistance(sculpture.distance)}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
