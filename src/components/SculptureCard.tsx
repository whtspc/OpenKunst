import type { SculptureWithDistance } from '../types/Sculpture';
import { formatDistance } from '../utils/geolocation';
import './SculptureCard.css';

interface SculptureCardProps {
  sculpture: SculptureWithDistance;
  onClick: () => void;
}

export function SculptureCard({ sculpture, onClick }: SculptureCardProps) {
  return (
    <article className="sculpture-card" onClick={onClick}>
      <div className="sculpture-card__image-container">
        <img
          src={sculpture.images[0]}
          alt={sculpture.name}
          className="sculpture-card__image"
          loading="lazy"
        />
        <div className="sculpture-card__gradient" />
      </div>

      <div className="sculpture-card__content">
        <div className="sculpture-card__distance">
          <svg
            className="sculpture-card__location-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          <span>{formatDistance(sculpture.distance)}</span>
        </div>

        <h2 className="sculpture-card__title">{sculpture.name}</h2>

        <p className="sculpture-card__artist">by {sculpture.artist}</p>

        <p className="sculpture-card__location">
          {sculpture.location.address}, {sculpture.location.city}
        </p>

        <div className="sculpture-card__tags">
          {sculpture.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="sculpture-card__tag">
              {tag}
            </span>
          ))}
        </div>

        <button className="sculpture-card__cta">
          View Details
          <svg
            className="sculpture-card__arrow"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </article>
  );
}
