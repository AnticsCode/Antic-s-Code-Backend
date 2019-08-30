import { Schema, model, Document } from 'mongoose';
import moment from 'moment';
import 'moment/locale/es'
import { Code } from '../interfaces/code.interface';
import { Link } from '../interfaces/link.interface';

const Slugs = require('mongoose-url-slugs');

const categories = {
  values: ['HTML', 'CSS', 'Javascript', 'Angular', 'Nodejs', 'MongoDB'],
  message: '{VALUE} is not an available category'
}

const level = {
  values: ['Básico', 'Medio', 'Avanzado'],
  message: '{VALUE} is not an available level'
}

const ArticleSchema = new Schema({
  title: { type: String, required: [true, 'Title required'], trim: true },
  message: { type: String, required: [true, 'Message required'] },
  author: { type: String, required: [true, 'Author required'] },
  category: { type: String, required: [true, 'Category required'], enum: categories },
  created: { type: String, required: [true, 'Date required'] },
  cover: { type: String, required: [true, 'Cover required'] },
  tags: { type: Array, required: [true, 'Tags required'] },
  badges: { type: Array, required: [true, 'Badges required'] },
  summary: { type: String, required: [true, 'Summary required'] },
  code: { type: Array, required: false },
  level: { type: String, required: [true, 'Level required'], enum: level },
  likes: { type: Number, required: false, default: 0 },
  stars: { type: Number, required: false, default: 0 },
  views: { type: Number, required: false, default: 0 },
  links: { type: Array, required: [true, 'Links required']}
});

ArticleSchema.pre<ARTICLE>('validate', function (next) {
  this.created = moment().locale('es').format('LL');
  next();
});

ArticleSchema.plugin(Slugs('title', { field: 'slug'}));

export interface ARTICLE extends Document {
  title: string;
  message: string;
  author: string;
  category: string;
  created: string;
  slug: string;
  cover: string;
  tags: string[];
  code?: Code[];
  level: string;
  likes: number;
  stars: number;
  views: number;
  badges: string[],
  links: Link[];
  summary: string;
}

export const Article = model<ARTICLE>('Article', ArticleSchema);