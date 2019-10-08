import { Request, Response } from 'express';
import { Error, ERROR } from '../models/error.model';

const ERROR_CTRL: any = {};


// READ
// CMS ONLY
ERROR_CTRL.getErrors = async (req: Request, res: Response) => {

  const errors = await Error.find({}, (err) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        message: "Error loading Errors XD",
        err
      });
    }
  }).sort({ _id: -1 });

  res.status(200).json({
    ok: true,
    message: 'Errors',
    errors
  });
}

// CREATE
ERROR_CTRL.saveError = async (req: Request, res: Response) => {

  const error: ERROR = req.body;

  if (error.name == '' || error.text == '' ||  error.message == '') {
      return res.status(400).json({
        ok: false,
        message: 'Error needs Name, Message, Text',
      });
  }

  Error.create(error).then(() => {
    res.status(201).json({
      ok: true,
      message: 'Error added'
    });
  }).catch(err => {
    return res.status(500).json({
      ok: false,
      message: 'Error adding Error XD',
      err
    });
  });
}

export default ERROR_CTRL;