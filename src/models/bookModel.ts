import mongoose, { Schema } from 'mongoose';
import { IBook, Genre } from '../types';

const bookSchema = new Schema<IBook>({
  title: { type: String, required: true, index: true },
  description: { type: String, required: false },
  author: { type: String, required: true, index: true },
  genre: { type: String, enum: Genre, required: true, index: true },
  publicationYear: { type: Number, required: true },
  isLoaned: { type: Boolean, required: true, default: false },
});

bookSchema.index({ author: 1, genre: 1 });
bookSchema.index({ author: 1, publicationYear: 1 });

export default mongoose.model<IBook>('TabitBook', bookSchema);
