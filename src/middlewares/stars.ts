import { Request, Response, NextFunction } from 'express';
import { Article } from '../models/article.model';
import { Stars } from '../models/stars.model';

export const CreateStars = async (req: Request, res: Response, next: NextFunction) => {

  const body = req.body;
  const id = req.params.id;

  const stars = await Stars.find({ article: id }, {}, (err) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        message: 'Error loading Stars by Article Id',
        err
      });
    }
  });

  if (!stars) {
    return res.status(400).json({
      ok: false,
      message: "Stars on Article with Id " + id + " doesn't exist",
    });
  }

  const articles = await Article.find({ _id: id }, {}, (err) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        message: 'Error loading Article by Id',
        err
      });
    }
  });

  if (!articles) {
    return res.status(400).json({
      ok: false,
      message: "Article with Id " + id + " doesn't exist",
    });
  }

  if (stars.length === 0) {
    const data = { article: articles[0] }

  await Stars.create(data).catch(err => {
    return res.status(500).json({
      ok: false,
      message: 'Error creating Stars on Article',
      err
    });
   });
  }

  next();
}