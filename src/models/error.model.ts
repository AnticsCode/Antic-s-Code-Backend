import { Schema, model, Document } from 'mongoose';

const ErrorSchema = new Schema({
  name: { type: String, required: [true, 'Name required'] },
  status: { type: Number, required: [true, 'Status required'] },
  statusText: { type: String, required: [true, 'StatusText required'] },
  url: { type: String, required: [true, 'URL required'] },
  author: { type: String, required: false }
});

export interface ERROR extends Document {
  name: string;
  status: number;
  statusText: string;
  url: string;
  author?: string;
}

export const Error = model<ERROR>('Error', ErrorSchema);