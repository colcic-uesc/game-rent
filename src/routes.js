import { Router } from "express";

const routes = Router();

import HomeController from "./app/controllers/HomeController.js";

routes.get('/', HomeController.index);

export default routes;