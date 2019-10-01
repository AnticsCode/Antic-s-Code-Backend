import { Request, Response } from 'express';
import { SearchRequest } from '../interfaces/interfaces';
import { Article, ARTICLE } from '../models/article.model';

const SEARCH_CTRL: any = {};

SEARCH_CTRL.search = async (req: Request, res: Response) => {

  const request: SearchRequest = req.body;

  Promise.all([
    searchArticle(request)
  ]).then(result => {
    res.status(200).json({
      ok: true,
      message: 'Search Content',
      articles: result[0]
    })
  }).catch(err => {
    return res.status(500).json({
      ok: false,
      message: "Error Searching Content",
      err
    });
  });
};

const searchArticle = (request: SearchRequest): Promise<ARTICLE[]> => {

  const filter = {
    message: 0,
    index: 0,
    code: 0,
    links: 0,
    summary: 0,
    author: 0
  }

  const value = new RegExp(request.value || '');
  const category = new RegExp(request.category || '');
  const tag = new RegExp(request.tag || '');

  const year = request.year || '';
  const level = request.level || ['Básico', 'Medio', 'Avanzado'];
  const badges = request.badges || ['Nuevo', 'Popular', 'Destacado'];
  const sort = request.sort || -1;
  const type = request.type || ['_id'];
  const stars = request.stars || [5,4,3,2,1,0];

  console.log(request);

  const sortObj: any = new Object();

  type.forEach((t: string) => {
    sortObj[t] = sort;
  });

  return new Promise((res, req) => {
    Article.find({
      $and: [
        { draft: false },
        {
          $or: [
            { title: { $regex: value, $options: 'is' }},
            { tags: { $regex: value, $options: 'is' }},
            { category: { $regex: value, $options: 'is' } },
          ],
          $and: [
            { category: { $regex: category, $options: 'is' }},
            { tags: { $regex: tag, $options: 'is' } },
            {
              $or: [{
                $and: [
                  { badges: {$in: badges} },
                  { stars: {$in: stars} },
                  { level: {$in: level} }
                ]
              }
            ]}
          ]
        }
      ]
    }, filter, (err, articles) => {
      err ? req(err) : res(articles);
    }).sort(sortObj);
  });
}

export default SEARCH_CTRL;