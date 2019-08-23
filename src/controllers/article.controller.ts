import { Request, Response } from 'express';
import { Article, ARTICLE } from '../models/article.model';

const ARTICLE_CTRL: any = {};

// GET
ARTICLE_CTRL.getArticles = async (req: Request, res: Response) => {

  const articles = await Article.find({}, (err) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        message: "Error loading Articles",
        err
      });
    }
  }).populate('user').sort({_id: -1});

  res.status(200).json({
    ok: true,
    message: 'Articles',
    articles
  });
}

ARTICLE_CTRL.getArticleById = async (req: Request, res: Response) => {

  const id = req.params.id;

  await Article.find({ _id: id }, {}, (err, article) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        message: 'Error loading Article by Id',
        err
      });
    }

    if (!article) {
      return res.status(400).json({
        ok: false,
        message: "Article with Id " + id + " doesn't exist",
      });
    }

    res.status(200).json({
      ok: true,
      message: 'Article by Id',
      article
    });
  });
}

// CREATE
ARTICLE_CTRL.addArticle = async (req: Request, res: Response) => {

  const body: ARTICLE = req.body;

  if (body.title == '' || body.message == '') {
    return res.status(400).json({
      ok: false,
      message: 'Article needs Title and Message',
    });
  }

  Article.create(body).then(article => {
    res.status(201).json({
      ok: true,
      message: 'Article created',
      article
    });
  }).catch(err => {
    return res.status(500).json({
      ok: false,
      message: 'Error creating Article',
      err
    });
  });
}

// UPDATE
ARTICLE_CTRL.updateArticle = async (req: Request, res: Response) => {

  const body: ARTICLE = req.body;
  const id = req.params.id;

  if (body.title == '' || body.message == '') {
    return res.status(400).json({
      ok: false,
      message: "Article needs Title, Message",
    });
  }

  Article.findByIdAndUpdate(id, body, { new: true }, (err, article) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        message: 'Error updating Article',
        err
      });
    }

    if (!article) {
      return res.status(400).json({
        ok: false,
        message: "Article with Id " + id + " doesn't exist",
      });
    }

    res.status(201).json({
      ok: true,
      message: 'Article updated',
      article
    });
  });
}

// DELETE
ARTICLE_CTRL.deleteArticleById = async (req: Request, res: Response) => {

  const id = req.params.id;

  Article.findOneAndRemove({ _id: id }, (err, article) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        message: 'Error Deleting Article',
        err
      });
    }

    if (!article) {
      return res.status(400).json({
        ok: false,
        message: "Article with Id " + id + " doesn't exist",
      });
    }

    res.status(202).json({
      ok: true,
      message: 'Article Deleted',
      article: article
    });
  });
};

export default ARTICLE_CTRL;