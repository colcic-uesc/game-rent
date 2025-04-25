import { Router } from "express";
// import multer from "multer";
// import multerConfig from "./config/multer";

import HomeController from "./app/controllers/HomeController";
import UsersController from "./app/controllers/UsersController";
import GamesController from "./app/controllers/GamesController";
import GenresController from "./app/controllers/GenresController";
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

// Genres
routes.get("/genres", GenresController.index);
routes.get("/genres/:id", GenresController.show);
routes.post("/genres", GenresController.create);
routes.put("/genres/:id", GenresController.update);
routes.delete("/genres/:id", GenresController.destroy);

// Games
routes.get("/games", GamesController.index);
routes.get("/games/:id", GamesController.show);
routes.post("/games", GamesController.create);
routes.put("/games/:id", GamesController.update);
routes.delete("/games/:id", GamesController.destroy);

export default routes;
