import { Router } from "express";
import ARTICLES_CTRL from "../../controllers/article.controller";
import { verifyToken } from "../../middlewares/auth";

const ARTICLES_ROUTE = Router();

ARTICLES_ROUTE
.get('/articles', ARTICLES_CTRL.getArticles)
.get('/articles/all', ARTICLES_CTRL.getAllArticles) // CMS
.get('/articles/last', ARTICLES_CTRL.getLastArticles)
.get('/articles/liked', ARTICLES_CTRL.getMostLikedArticles)
.get('/articles/code', ARTICLES_CTRL.getArticlesCode)
.get('/articles/count', ARTICLES_CTRL.getArticlesCount)
.get('/articles/user', verifyToken, ARTICLES_CTRL.getArticlesByUser)
.get('/article/:slug', ARTICLES_CTRL.getArticleBySlug)
.get('/articles/:id', ARTICLES_CTRL.getArticleById) // CMS
.get('/articles/category/:name', ARTICLES_CTRL.getArticlesByCategory)
.get('/articles/categories/count', ARTICLES_CTRL.getArticlesByCategoryCount)
.post('/articles/likes/:id', ARTICLES_CTRL.addLikeToArticle)
.post('/articles/publish/:id', ARTICLES_CTRL.publishArticle)
.post('/articles', ARTICLES_CTRL.addArticle) // CMS
.put('/articles/:id', ARTICLES_CTRL.updateArticle) // CMS
.delete('/articles/:id', ARTICLES_CTRL.deleteArticleById); // CMS

export default ARTICLES_ROUTE;