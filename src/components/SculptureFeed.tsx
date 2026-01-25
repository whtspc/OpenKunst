import type { SculptureWithDistance } from '../types/Sculpture';
import { SculptureCard } from './SculptureCard';
import './SculptureFeed.css';

interface SculptureFeedProps {
  sculptures: SculptureWithDistance[];
  onSelectSculpture: (sculpture: SculptureWithDistance) => void;
}

export function SculptureFeed({ sculptures, onSelectSculpture }: SculptureFeedProps) {
  if (sculptures.length === 0) {
    return (
      <div className="sculpture-feed__empty">
        <p>No sculptures found nearby</p>
      </div>
    );
  }

  return (
    <div className="sculpture-feed">
      {sculptures.map((sculpture) => (
        <SculptureCard
          key={sculpture.id}
          sculpture={sculpture}
          onClick={() => onSelectSculpture(sculpture)}
        />
      ))}
    </div>
  );
}
