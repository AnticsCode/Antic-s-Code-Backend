import { Router } from "express";
import ERROR_CTRL from "../../controllers/error.controller";

const ERRORS_ROUTE = Router();

ERRORS_ROUTE.post('/errors', ERROR_CTRL.saveError);

export default ERRORS_ROUTE;