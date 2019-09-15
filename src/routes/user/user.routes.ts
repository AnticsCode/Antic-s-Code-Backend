import { Router } from "express";
import USER_CTRL from "../../controllers/user.controller";
import { verifyToken } from "../../middlewares/auth";

const USER_ROUTES = Router();

USER_ROUTES.get('/users', USER_CTRL.getUsers)
.get('/users/:id', USER_CTRL.getUserById)
.post('/users', USER_CTRL.createUser)
.put('/users', verifyToken, USER_CTRL.updateUser)
.delete('/users', verifyToken, USER_CTRL.deleteUser);

export default USER_ROUTES;