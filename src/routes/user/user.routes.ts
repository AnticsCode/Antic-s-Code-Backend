import { Router } from "express";
import USER_CTRL from "../../controllers/user.controller";
import { verifyToken } from "../../middlewares/auth";

const USER_ROUTES = Router();

USER_ROUTES.get('/users', USER_CTRL.getUsers);
USER_ROUTES.post('/users', USER_CTRL.createUser);
USER_ROUTES.put('/users', verifyToken, USER_CTRL.updateUser);
USER_ROUTES.delete('/users', verifyToken, USER_CTRL.deleteUser);

export default USER_ROUTES;