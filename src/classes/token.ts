import jwt from 'jsonwebtoken';
import { USER } from '../models/user.model';
import { SEED, EXPIRATION } from '../config/server.config';

export default class Token {
  private static seed: string = SEED;
  private static expires: number = EXPIRATION;

  constructor() { }

  static createToken(user: USER): string {
    return jwt.sign({ user }, this.seed, { expiresIn: this.expires });
  }

  static checkToken(token: string) {
    return jwt.verify(token, this.seed, (err, decoded) => {
      if (err) { return }
      return decoded;
    });
  }

}