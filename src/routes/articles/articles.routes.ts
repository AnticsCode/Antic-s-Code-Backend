import { Router } from "express";
import ARTICLES_CTRL from "../../controllers/article.controller";

const ARTICLES_ROUTE = Router();

ARTICLES_ROUTE.get('/articles', ARTICLES_CTRL.getArticles);
ARTICLES_ROUTE.get('/articles/code', ARTICLES_CTRL.getArticlesCode);
ARTICLES_ROUTE.get('/article/:slug', ARTICLES_CTRL.getArticleBySlug);
ARTICLES_ROUTE.get('/articles/:id', ARTICLES_CTRL.getArticleById);
ARTICLES_ROUTE.get('/search/articles/:value', ARTICLES_CTRL.searchArticles);
ARTICLES_ROUTE.post('/articles', ARTICLES_CTRL.addArticle);
ARTICLES_ROUTE.put('/articles/:id', ARTICLES_CTRL.updateArticle);
ARTICLES_ROUTE.delete('/articles/:id', ARTICLES_CTRL.deleteArticleById);

export default ARTICLES_ROUTE;