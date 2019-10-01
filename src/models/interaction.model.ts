import { Schema, model, Document } from 'mongoose';

const InteractionSchema = new Schema({
  reference: { type: Schema.Types.ObjectId, required: [true, 'Reference required'] },
  type: { type: String, required: [true, 'Type required'] },
  user: { type: Schema.Types.ObjectId, ref: "User", required: [true, 'Reference required']  }
});

export interface INTERACTION extends Document {
  reference: string;
  type: string;
  user: string;
}

export const Interaction = model<INTERACTION>('Interaction', InteractionSchema);