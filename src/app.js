import "dotenv/config";

import express from "express";
import Youch from "youch";
import "express-async-errors";
import cors from "cors";
import path from "path";

import { specs, swaggerUi } from "./config/swagger";

import routes from "./routes";

import "./database/index";

class App {
  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
    this.exceptionHandler();
  }

  middlewares() {
    this.server.use(cors());
    this.server.use(express.json());
    this.server.use(express.urlencoded({ extended: false }));
    this.server.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
    this.server.use(
      "/files",
      express.static(path.join(__dirname, "..", "public"))
    );
  }

  routes() {
    this.server.use(routes);
  }

  exceptionHandler() {
    this.server.use(async (err, req, res, next) => {
      if (process.env.NODE_ENV === "development") {
        const errors = await new Youch(err, req).toJSON();
        return res.status(500).json(errors);
      }

      return res.status(500).json({ error: "Internal server error" });
    });
  }
}

export default new App().server;
