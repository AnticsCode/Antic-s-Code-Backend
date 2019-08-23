import { Schema, model, Document } from 'mongoose';
import { Code } from '../interfaces/code.interface';
import { Link } from '../interfaces/link.interface';
import { Info } from '../interfaces/info.interface';

const categories = {
  values: ['HTML', 'CSS', 'Javascript', 'Angular', 'Nodejs', 'MongoDB'],
  message: '{VALUE} is not an available category'
}

const CategorySchema = new Schema({
  title: { type: String, required: [true, 'Title required'], trim: true },
  name: { type: String, required: [true, 'Name required'] },
  message: { type: String, required: [true, 'Message required'] },
  category: { type: String, required: [true, 'Category required'], enum: categories },
  cover: { type: String, required: [true, 'Cover required'] },
  tags: { type: Array, required: [true, 'Tags required'] },
  info: { type: Object, required : [true, 'Info required'] },
  badges: { type: Array, required: [true, 'Badges required'] },
  links: { type: Array, required: [true, 'Links required']},
  icon: { type: String, required: [true, 'Icon required']},
  code: { type: Array, required: false },
  likes: { type: Number, required: false, default: 0 },
  stars: { type: Number, required: false, default: 0 }
});

export interface CATEGORY extends Document {
  title: string;
  name: string;
  message: string;
  category: string;
  info: Info;
  cover: string;
  icon: string;
  tags: string[];
  badges: string[];
  code?: Code[];
  likes: number;
  stars: number;
  links: Link[];
}

export const Category = model<CATEGORY>('Category', CategorySchema);