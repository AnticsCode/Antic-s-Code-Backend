import { Router } from "express";
import INTERACTION_CTRL from '../../controllers/interaction.controller';
import { verifyToken } from "../../middlewares/auth";

const INTERACTION_ROUTES = Router();

INTERACTION_ROUTES
  .get('/interaction', verifyToken, INTERACTION_CTRL.getInteractionByUser)
  .post('/interaction', verifyToken, INTERACTION_CTRL.doInteraction);

export default INTERACTION_ROUTES;