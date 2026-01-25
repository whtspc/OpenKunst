import './Header.css';

interface HeaderProps {
  locationStatus: 'loading' | 'granted' | 'denied' | 'unavailable';
  onRequestLocation: () => void;
}

export function Header({ locationStatus, onRequestLocation }: HeaderProps) {
  return (
    <header className="header">
      <h1 className="header__logo">OpenKunst</h1>

      <button
        className={`header__location header__location--${locationStatus}`}
        onClick={onRequestLocation}
        title={
          locationStatus === 'granted'
            ? 'Location enabled'
            : locationStatus === 'denied'
              ? 'Location denied - tap to retry'
              : locationStatus === 'loading'
                ? 'Getting location...'
                : 'Enable location'
        }
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
        <span className="header__location-text">
          {locationStatus === 'loading' && 'Finding you...'}
          {locationStatus === 'granted' && 'Near you'}
          {locationStatus === 'denied' && 'Location off'}
          {locationStatus === 'unavailable' && 'Enable location'}
        </span>
      </button>
    </header>
  );
}
