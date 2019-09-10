import { Router } from "express";
import ARTICLES_CTRL from "../../controllers/article.controller";
import { CreateStars } from "../../middlewares/stars";

const ARTICLES_ROUTE = Router();

ARTICLES_ROUTE
.get('/articles', ARTICLES_CTRL.getArticles)
.get('/articles/all', ARTICLES_CTRL.getAllArticles)
.get('/articles/last', ARTICLES_CTRL.getLastArticles)
.get('/articles/liked', ARTICLES_CTRL.getMostLikedArticles)
.get('/articles/code', ARTICLES_CTRL.getArticlesCode)
.get('/articles/count', ARTICLES_CTRL.getArticlesCount)
.get('/article/:slug', ARTICLES_CTRL.getArticleBySlug)
.get('/articles/:id', ARTICLES_CTRL.getArticleById)
.post('/articles/likes/:id', ARTICLES_CTRL.addLikeToArticle)
.post('/articles/stars/:id', CreateStars, ARTICLES_CTRL.addStarsToArticle)
.post('/articles', ARTICLES_CTRL.addArticle)
.put('/articles/:id', ARTICLES_CTRL.updateArticle)
.delete('/articles/:id', ARTICLES_CTRL.deleteArticleById);

export default ARTICLES_ROUTE;