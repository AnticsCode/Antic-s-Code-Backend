import { Schema, model, Document } from 'mongoose';
import moment from 'moment';

const ErrorSchema = new Schema({
  name: { type: String, required: [true, 'Name required'] },
  message: { type: String, required: [true, 'Message required'] },
  status: { type: Number, required: [true, 'Status required'] },
  text: { type: String, required: [true, 'StatusText required'] },
  url: { type: String, required: [true, 'URL required'] },
  author: { type: Schema.Types.ObjectId, ref: 'User', required: false },
  date: { type: String, required: [true, 'Date required'] }
});

ErrorSchema.pre<ERROR>('validate', function (next) {
  this.date = moment().format('LLL');
  next();
});

export interface ERROR extends Document {
  name: string;
  message: string;
  status: number;
  text: string;
  url: string;
  author?: string;
  date: string;
}

export const Error = model<ERROR>('Error', ErrorSchema);