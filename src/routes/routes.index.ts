import Router from 'express';
import MAIN_ROUTE from './main/main.route';
import ARTICLES_ROUTE from './articles/articles.routes';
import CATEGORIES_ROUTE from './categories/categories.routes';
import USER_ROUTES from './user/user.routes';
import LOGIN_ROUTES from './login/login.routes';
import AUTH_ROUTES from './auth/auth.routes';
import ERRORS_ROUTE from './errors/errors.route';

const ROUTES = Router();

ROUTES.use('/',
  [
    MAIN_ROUTE,
    USER_ROUTES,
    LOGIN_ROUTES,
    AUTH_ROUTES,
    ARTICLES_ROUTE,
    CATEGORIES_ROUTE,
    ERRORS_ROUTE
]);

export default ROUTES;