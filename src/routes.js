import { Router } from "express";

const routes = Router();

import HomeController from "./app/controllers/HomeController";
import UsersController from "./app/controllers/UsersController";

// Home
routes.get("/", HomeController.index);

// Users
routes.get("/users", UsersController.index);
routes.get("/users/:id", UsersController.show);
routes.post("/users", UsersController.create);
routes.put("/users/:id", UsersController.update);
routes.delete("/users/:id", UsersController.destroy);

export default routes;
