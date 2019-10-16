import { Schema, model, Document } from 'mongoose';

const InteractionSchema = new Schema({
  article: {
    type: Schema.Types.ObjectId,
    ref: "Article",
    required: [true, 'Reference required']
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, 'User required']
  },
  type: { type: String, required: [true, 'Type required'] },
  value: { type: Number, required: [true, 'Value required'] }
});

export interface INTERACTION extends Document {
  article: string;
  user: string;
  type: string;
  value: number;
}

export const Interaction = model<INTERACTION>('Interaction', InteractionSchema);