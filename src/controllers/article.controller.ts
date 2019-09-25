import { Request, Response } from 'express';
import { Article, ARTICLE } from '../models/article.model';
import { Stars } from '../models/stars.model';
import { LIMIT } from '../config/server.config';
import { Code } from '../interfaces/interfaces';
import { countBy } from 'lodash';

const ARTICLE_CTRL: any = {};

// GET
ARTICLE_CTRL.getArticles = async (req: Request, res: Response) => {

  let page = Number(req.query.page) || 1;
  if (page < 0) page = 1;
  let skip = page - 1;
  skip = skip * LIMIT;

  const filter = {
    message: 0,
    code: 0,
    links: 0,
    index: 0
  }

  const articles = await Article.find({draft: false}, filter, (err) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        message: "Error loading Articles",
        err
      });
    }
  }).limit(LIMIT)
    .skip(skip)
    .sort({ _id: -1 });

  res.status(200).json({
    ok: true,
    message: 'Articles',
    page,
    articles
  });
}

// CMS ONLY
ARTICLE_CTRL.getAllArticles = async (req: Request, res: Response) => {

  const articles = await Article.find({}, (err) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        message: "Error loading Articles",
        err
      });
    }
  }).sort({ _id: -1 });

  res.status(200).json({
    ok: true,
    message: 'Articles',
    articles
  });
}

ARTICLE_CTRL.getArticlesCount = async (req: Request, res: Response) => {

  Article.countDocuments({draft: false}, (err, count) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        message: "Error counting Articles",
        err
      });
    }

    res.status(200).json({
      ok: true,
      message: 'Articles Count',
      count
    });
  });
}

ARTICLE_CTRL.getArticlesByUser = async (req: Request, res: Response) => {

  const filter = {
    title: 1,
    slug: 1,
    draft: 1
  };

  const name = req.user.name;

  const articles = await Article.find({author: name}, filter, (err) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        message: "Error loading Articles",
        err
      });
    }
  }).sort({ _id: -1 });

  res.status(200).json({
    ok: true,
    message: 'Articles by User',
    articles
  });
}

ARTICLE_CTRL.getArticlesByCategory = async (req: Request, res: Response) => {
  res.status(200).json({
    ok: true,
    message: 'Everything OK'
  })
}

ARTICLE_CTRL.getArticlesByCategoryCount = async (req: Request, res: Response) => {

  const filter = {
    category: 1,
    _id: 0
  }

  const articles = await Article.find({draft: false}, filter, (err) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        message: "Error loading Articles",
        err
      });
    }
  }).sort({ _id: -1 });

  if (articles) {
    const array = articles.map((a: ARTICLE) => a.category);
    const count = countBy(array);

    res.status(200).json({
      ok: true,
      message: 'Articles By Category Count',
      count
    });
  }
}

ARTICLE_CTRL.getLastArticles = async (req: Request, res: Response) => {

  const filter = {
    message: 0,
    index: 0,
    code: 0,
    links: 0,
    summary: 0,
    author: 0
  }

  const articles = await Article.find({draft: false}, filter, (err) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        message: "Error loading Articles",
        err
      });
    }
  }).sort({ _id: -1 })
    .limit(6);

  res.status(200).json({
    ok: true,
    message: 'Last Articles',
    articles
  });
}

ARTICLE_CTRL.getMostLikedArticles = async (req: Request, res: Response) => {

  const filter = {
    likes: 1,
    title: 1,
    slug: 1,
    cover: 1
  }

  const articles = await Article.find({draft: false}, filter, (err) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        message: "Error loading Articles",
        err
      });
    }
  }).sort({ likes: -1 })
    .limit(4);

  res.status(200).json({
    ok: true,
    message: 'Most Liked Articles',
    articles
  });
}

ARTICLE_CTRL.getArticlesCode = async (req: Request, res: Response) => {

  let code: Code[] = [];

  const articles = await Article.find({draft: false}, {code: 1}, (err) => {
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

// CMS ONLY
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

  const articles = await Article.find({ slug }, {}, (err) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        message: 'Error loading Article by Slug',
        err
      });
    }
  });

  if (!articles) {
    return res.status(400).json({
      ok: false,
      message: "Article with Id " + slug + " doesn't exist",
    });
  }

  if (articles[0].draft) {
   return res.status(200).json({
      ok: true,
      message: 'Article Draft by Slug',
      articles
    });
  }

  Article.updateOne({ slug }, { $inc: {views: 1} }, ((err) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        message: 'Error Updating Article Views',
        err
      });
    }

    res.status(200).json({
      ok: true,
      message: 'Article by Slug',
      articles
    });
  }));
}

// CMS ONLY
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

ARTICLE_CTRL.addLikeToArticle = async (req: Request, res: Response) => {

  const id = req.params.id;

  Article.updateOne({ _id: id }, { $inc: {likes: 1} } , ((err) => {

    if (err) {
      return res.status(500).json({
        ok: false,
        message: 'Error Updating Article Likes',
        err
      });
    }

    res.status(202).json({
      ok: true,
      message: 'Add Like to Article'
    });
  }));
};

ARTICLE_CTRL.publishArticle = async (req: Request, res: Response) => {

  const id = req.params.id;
  const draft = req.body;

  console.log(id);
  console.log(draft);

  Article.updateOne({ _id: id }, { $set: draft }, ((err) => {

    if (err) {
      return res.status(500).json({
        ok: false,
        message: 'Error Publishing Article',
        err
      });
    }

    res.status(202).json({
      ok: true,
      message: 'Article Published'
    });
  }));
}

// CMS ONLY
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

// CMS ONLY
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