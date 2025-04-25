import { Router } from "express";
// import multer from "multer";
// import multerConfig from "./config/multer";

import HomeController from "./app/controllers/HomeController";
import UsersController from "./app/controllers/UsersController";
import PlatformsController from "./app/controllers/PlatformsController";

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

// Platforms
routes.get("/platforms", PlatformsController.index);
routes.get("/platforms/:id", PlatformsController.show);
routes.post("/platforms", PlatformsController.create);
routes.put("/platforms/:id", PlatformsController.update);
routes.delete("/platforms/:id", PlatformsController.destroy);

export default routes;
