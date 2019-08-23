import { Request, Response } from 'express';

const MAIN_CTRL: any = {};

MAIN_CTRL.welcome = async (req: Request, res: Response) => {
  res.status(200).json({
    ok: true,
    message: 'Everything OK'
  })
};

export default MAIN_CTRL;