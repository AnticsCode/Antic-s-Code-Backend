import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcrypt';
import validator from 'mongoose-unique-validator';
import { UserProfile } from '../interfaces/interfaces';

const roles = {
  values: ['Super', 'Admin', 'User', 'Guest'],
  message: '{VALUE} is not an available Rol'
}

const UserSchema = new Schema({
  name: { type: String, required: [true, 'Name required'] },
  password: { type: String, required: [true, 'Password required'] },
  email: { type: String, unique: true, required: [true, 'Email required'] },
  account: {
    type: String,
    required: [true, 'Account required'],
    default: 'User',
    enum: roles
  },
  profile: { type: Object, required: false, default: {} }
});

UserSchema.plugin(validator, { message: '{PATH} must be unique' });

UserSchema.methods.toJSON = function() {
  let obj = this.toObject();
  delete obj.password;
  return obj;
}

UserSchema.method('checkPassword', function (password: string = ''): boolean {
  return bcrypt.compareSync(password, this.password) ? true : false;
});

export interface USER extends Document {
  name: string;
  password: string;
  email: string;
  account: string;
  profile: UserProfile;
  checkPassword(password: string): boolean;
}

export const User = model<USER>('User', UserSchema);