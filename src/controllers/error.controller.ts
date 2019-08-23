import { Request, Response } from 'express';
import { Error, ERROR } from '../models/error.model';

const ERROR_CTRL: any = {};

// CREATE
ERROR_CTRL.saveError = async (req: Request, res: Response) => {

  const body: ERROR = req.body;

  if (body.name == '' || body.status == null ||
      body.statusText == '' || body.url == '') {
    return res.status(400).json({
      ok: false,
      message: 'Error needs Name, Status, StatusText and URL',
    });
  }

  Error.create(body).then(article => {
    res.status(201).json({
      ok: true,
      message: 'Error added',
      article
    });
  }).catch(err => {
    return res.status(500).json({
      ok: false,
      message: 'Error adding Error',
      err
    });
  });
}

export default ERROR_CTRL;