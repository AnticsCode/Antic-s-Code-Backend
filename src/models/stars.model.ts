import { Schema, model, Document } from 'mongoose';

const StarsSchema = new Schema({
  article: { type: Schema.Types.ObjectId, ref: 'Article', required: [true, 'Article required'] },
  stars: { type: Array, required: [true, 'Stars required'], default: [] }
});

export interface STARS extends Document {
  article: string;
  stars: number[];
}

export const Stars = model<STARS>('Stars', StarsSchema);