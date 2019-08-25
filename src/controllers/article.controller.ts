import { Request, Response } from 'express';
import { Article, ARTICLE } from '../models/article.model';
import { LIMIT } from '../config/server.config';
import { Code } from '../interfaces/code.interface';

const ARTICLE_CTRL: any = {};

// GET
ARTICLE_CTRL.getArticles = async (req: Request, res: Response) => {

  const page = Number(req.query.page) || 1;
  let skip = page - 1;
  skip = skip * LIMIT;

  const articles = await Article.find({}, (err) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        message: "Error loading Articles",
        err
      });
    }
  }).limit(LIMIT)
    .skip(skip)
    .populate('user')
    .sort({ _id: -1 });

  res.status(200).json({
    ok: true,
    message: 'Articles',
    articles
  });
}

ARTICLE_CTRL.getArticlesCode = async (req: Request, res: Response) => {

  let code: Code[] = [];

  const articles = await Article.find({}, (err) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        message: "Error loading Articles Code",
        err
      });
    }
  });

  if (articles) {
    articles.forEach((x: ARTICLE) => { code.push(...x.code)})
  }

  res.status(200).json({
    ok: true,
    message: 'Articles Code',
    code
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

ARTICLE_CTRL.getArticleBySlug = async (req: Request, res: Response) => {

  const slug = req.params.slug;

  await Article.find({ slug }, {}, (err, articles) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        message: 'Error loading Article by Slug',
        err
      });
    }

    if (!articles) {
      return res.status(400).json({
        ok: false,
        message: "Article with Id " + slug + " doesn't exist",
      });
    }

    res.status(200).json({
      ok: true,
      message: 'Article by Slug',
      articles
    });
  });
}

ARTICLE_CTRL.searchArticles = async (req: Request, res: Response) => {

  const value = req.params.value;
  if (!value) {
    return res.status(400).json({
      ok: false,
      message: 'Need a Value',
    });
  }

  const page = Number(req.query.page) || 1;
  let skip = page - 1;
  skip = skip * LIMIT;

  const filter = new RegExp (value, 'i');

  const articles = await Article.find({ title: filter }, {}, (err) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        message: 'Error search Articles',
        err
      });
    }
  }).limit(LIMIT)
    .skip(skip)
    .sort({ _id: -1 });

    if (!articles) {
      return res.status(400).json({
        ok: false,
        message: "Value " + value + "doesn't meet any criteria",
      });
    }

    res.status(200).json({
      ok: true,
      message: 'Search Articles',
      articles
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