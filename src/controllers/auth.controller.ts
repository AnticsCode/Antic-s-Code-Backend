import { Request, Response } from 'express';
import { USER } from '../models/user.model';
import Token from '../classes/token';

const AUTH_CTRL: any = {};

AUTH_CTRL.getUserByToken = async (req: Request, res: Response) => {

  const user = req.user;

  res.status(200).json({
    ok: true,
    message: 'User by Token',
    user
  });
}

AUTH_CTRL.refreshToken = async (req: Request, res: Response) => {

  const user: USER = req.body;
  const token = Token.createToken(user);

  res.status(200).json({
    ok: true,
    message: 'Refresh Token',
    token,
    user
  });

}

export default AUTH_CTRL;