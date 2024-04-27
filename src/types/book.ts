export enum Genre {
  Drama = 'Drama',
  Action = 'Action',
  Romance = 'Romance',
  Horror = 'Horror',
}
export interface IBook extends Document {
  title: string;
  description: string;
  author: string;
  genre: Genre;
  publicationYear: number;
  isLoaned: boolean;
}

export interface SearchQuery {
  author?: string;
  genre?: string;
  publicationYear?: number;
}
