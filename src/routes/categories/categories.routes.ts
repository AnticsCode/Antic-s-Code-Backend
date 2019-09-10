import { Router } from "express";
import CATEGORIES_CTRL from "../../controllers/category.controller";

const CATEGORIES_ROUTE = Router();

CATEGORIES_ROUTE
.get('/categories', CATEGORIES_CTRL.getCategories)
.get('/categories/:id', CATEGORIES_CTRL.getCategoryById)
.get('/category/:name', CATEGORIES_CTRL.getCategoryByName)
.post('/categories', CATEGORIES_CTRL.addCategory)
.put('/categories/:id', CATEGORIES_CTRL.updateCategory)
.delete('/categories/:id', CATEGORIES_CTRL.deleteCategoryById);

export default CATEGORIES_ROUTE;