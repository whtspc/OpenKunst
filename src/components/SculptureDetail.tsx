import type { SculptureWithDistance } from '../types/Sculpture';
import { formatDistance } from '../utils/geolocation';
import './SculptureDetail.css';

const PLACEHOLDER_IMAGE = `${import.meta.env.BASE_URL}no-image.svg`;

interface SculptureDetailProps {
  sculpture: SculptureWithDistance;
  onClose: () => void;
  onSelectArtist?: (artistName: string) => void;
}

export function SculptureDetail({ sculpture, onClose, onSelectArtist }: SculptureDetailProps) {
  const mapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${sculpture.location.lng - 0.005}%2C${sculpture.location.lat - 0.003}%2C${sculpture.location.lng + 0.005}%2C${sculpture.location.lat + 0.003}&layer=mapnik&marker=${sculpture.location.lat}%2C${sculpture.location.lng}`;

  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${sculpture.location.lat},${sculpture.location.lng}`;

  const images = sculpture.images.length > 0 ? sculpture.images : [PLACEHOLDER_IMAGE];

  return (
    <div className="sculpture-detail">
      <header className="sculpture-detail__header">
        <button className="sculpture-detail__back" onClick={onClose}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Back
        </button>
      </header>

      <div className="sculpture-detail__content">
        <div className="sculpture-detail__images">
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`${sculpture.name} - Image ${index + 1}`}
              className="sculpture-detail__image"
            />
          ))}
        </div>

        <div className="sculpture-detail__info">
          <div className="sculpture-detail__distance-badge">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            {formatDistance(sculpture.distance)}
          </div>

          <h1 className="sculpture-detail__title">{sculpture.name}</h1>

          <p className="sculpture-detail__artist">
            by{' '}
            {onSelectArtist ? (
              <button
                className="sculpture-detail__artist-link"
                onClick={() => onSelectArtist(sculpture.artist)}
              >
                {sculpture.artist}
              </button>
            ) : (
              <strong>{sculpture.artist}</strong>
            )}
            {sculpture.year && <span> ({sculpture.year})</span>}
          </p>

          <div className="sculpture-detail__tags">
            {sculpture.tags.map((tag) => (
              <span key={tag} className="sculpture-detail__tag">
                {tag}
              </span>
            ))}
          </div>

          <section className="sculpture-detail__section">
            <h2>About</h2>
            <p>{sculpture.description}</p>
          </section>

          <section className="sculpture-detail__section">
            <h2>Materials</h2>
            <ul className="sculpture-detail__materials">
              {sculpture.materials.map((material) => (
                <li key={material}>{material}</li>
              ))}
            </ul>
          </section>

          <section className="sculpture-detail__section">
            <h2>Location</h2>
            <p className="sculpture-detail__address">
              {sculpture.location.address}<br />
              {sculpture.location.city}
            </p>

            <div className="sculpture-detail__map-container">
              <iframe
                className="sculpture-detail__map"
                src={mapUrl}
                title={`Map showing ${sculpture.name}`}
                loading="lazy"
              />
            </div>

            <a
              href={directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="sculpture-detail__directions"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="3 11 22 2 13 21 11 13 3 11" />
              </svg>
              Get Directions
            </a>
          </section>
        </div>
      </div>
    </div>
  );
}
