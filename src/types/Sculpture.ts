export interface Sculpture {
  id: string;
  name: string;
  artist: string;
  year: number | null;
  description: string;
  materials: string[];
  location: {
    lat: number;
    lng: number;
    address: string;
    city: string;
  };
  images: string[];
  tags: string[];
}

export interface SculptureWithDistance extends Sculpture {
  distance: number | null; // distance in meters, null if location unavailable
}
