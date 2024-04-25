import { Schema } from 'mongoose';
import { IUser } from './user';

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
}

export interface SearchQuery {
  author?: string;
  genre?: string;
  year?: number;
}
