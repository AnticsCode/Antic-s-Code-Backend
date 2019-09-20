import { Request, Response } from 'express';
import { User, USER } from '../models/user.model';
import Token from '../classes/token';

const LOGIN_CTRL: any = {};

LOGIN_CTRL.loginUser = async (req: Request, res: Response) => {

  const body: USER = req.body;

  await User.findOne({ email: body.email }, {}, (err, user) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        message: 'Login Error',
        err
      });
    }

    if (!user) {
      return res.status(406).json({
        ok: false,
        message: 'Incorrect credentials'  // Email
      });
    }

    if (!user.checkPassword(body.password)) {
      return res.status(406).json({
        ok: false,
        message: "Incorrect credentials"  // Password
      });
    }
    user.password = '';
    const token = Token.createToken(user);

    res.status(200).json({
      ok: true,
      message: 'Logged in',
      user,
      token
    });
  });
}

export default LOGIN_CTRL;