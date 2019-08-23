import { Router } from "express";
import LOGIN_CTRL from "../../controllers/login.controller";

const LOGIN_ROUTES = Router();

LOGIN_ROUTES.post('/login', LOGIN_CTRL.loginUser);

export default LOGIN_ROUTES;