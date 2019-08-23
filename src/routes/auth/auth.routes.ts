import { Router } from "express";
import AUTH_CTRL from "../../controllers/auth.controller";
import { verifyToken } from "../../middlewares/auth";

const AUTH_ROUTES = Router();

AUTH_ROUTES.get('/token', verifyToken, AUTH_CTRL.getUserByToken); // Verify
AUTH_ROUTES.post('/token', AUTH_CTRL.refreshToken); // Token

export default AUTH_ROUTES;