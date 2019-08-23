import { Router } from "express";
import CATEGORIES_CTRL from "../../controllers/category.controller";

const CATEGORIES_ROUTE = Router();

CATEGORIES_ROUTE.get('/categories', CATEGORIES_CTRL.getCategories);
CATEGORIES_ROUTE.get('/categories/:id', CATEGORIES_CTRL.getCategoryById);
CATEGORIES_ROUTE.post('/categories', CATEGORIES_CTRL.addCategory);
CATEGORIES_ROUTE.put('/categories/:id', CATEGORIES_CTRL.updateCategory);
CATEGORIES_ROUTE.delete('/categories/:id', CATEGORIES_CTRL.deleteCategoryById);

export default CATEGORIES_ROUTE;