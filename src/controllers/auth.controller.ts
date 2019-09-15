import { Request, Response } from 'express';
import { USER, User } from '../models/user.model';
import Token from '../classes/token';

const AUTH_CTRL: any = {};

AUTH_CTRL.getUserByToken = async (req: Request, res: Response) => {

  const user = req.user;

  if (!user) {
    return res.status(500).json({
      ok: false,
      message: "Error loading User by Token"
    });
  }

  res.status(200).json({
    ok: true,
    message: 'User by Token',
    user
  });
}

AUTH_CTRL.refreshToken = async (req: Request, res: Response) => {

  const id = req.params.id;

  await User.findById(id, (err, user) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        message: 'Error loading User by Id',
        err
      });
    }

    if (!user) {
      return res.status(400).json({
        ok: false,
        message: "User with Id " + id + " doesn't exist",
      });
    }

    const token = Token.createToken(user);

    res.status(200).json({
      ok: true,
      message: 'User by Id',
      user,
      token
    });
  });
}

export default AUTH_CTRL;