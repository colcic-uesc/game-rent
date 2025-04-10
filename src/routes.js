import { Router } from "express";
// import multer from "multer";
// import multerConfig from "./config/multer";

import HomeController from "./app/controllers/HomeController";
import UsersController from "./app/controllers/UsersController";

const routes = Router();
// const upload = multer(multerConfig);

// Home
routes.get("/", HomeController.index);

// Users
routes.get("/users", UsersController.index);
routes.get("/users/:id", UsersController.show);
routes.post("/users", UsersController.create);
routes.put("/users/:id", UsersController.update);
routes.delete("/users/:id", UsersController.destroy);

export default routes;
