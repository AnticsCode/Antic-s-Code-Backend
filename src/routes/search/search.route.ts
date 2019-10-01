import { Router } from "express";
import SEARCH_CTRL from "../../controllers/search.controller";

const SEARCH_ROUTE = Router();

SEARCH_ROUTE.post('/search', SEARCH_CTRL.search);

export default SEARCH_ROUTE;