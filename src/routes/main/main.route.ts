import { Router } from "express";
import MAIN_CTRL from "../../controllers/main.controller";

const MAIN_ROUTE = Router();

MAIN_ROUTE.get('/', MAIN_CTRL.welcome);

export default MAIN_ROUTE;