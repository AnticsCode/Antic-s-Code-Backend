import { Router } from "express";
import CATEGORIES_CTRL from "../../controllers/category.controller";

const CATEGORIES_ROUTE = Router();

CATEGORIES_ROUTE
.get('/categories', CATEGORIES_CTRL.getCategories) // CMS
.get('/categories/:id', CATEGORIES_CTRL.getCategoryById) // CMS
.get('/category/:name', CATEGORIES_CTRL.getCategoryByName)
.post('/categories', CATEGORIES_CTRL.addCategory) // CMS
.put('/categories/:id', CATEGORIES_CTRL.updateCategory) // CMS
.delete('/categories/:id', CATEGORIES_CTRL.deleteCategoryById); // CMS

export default CATEGORIES_ROUTE;