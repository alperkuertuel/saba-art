export interface ArtPieceType {
  _id: string;
  slug: string;
  imageUrl: string;
  name: string;
  date: number;
  available: boolean;
  description: string;
  category: string;
  technique: string;
  widthReal: string;
  heightReal: string;
}

export type ActiveCategory =
  | 'Neue'
  | 'Alle'
  | 'Verfügbare'
  | 'Vergeben'
  | 'Favoriten';

export type PreviewOption = 'smallGrid' | 'mediumGrid' | 'slideShow';
