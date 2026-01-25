export interface Artist {
  id: string;
  name: string;
  bio: string;
  birthYear: number | null;
  deathYear: number | null;
  nationality: string;
  website: string | null;
  image: string | null;
}
