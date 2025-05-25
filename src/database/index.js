import Sequelize from "sequelize";

import { development } from "../config/database";

import User from "../app/models/User";
import Game from "../app/models/Game";
import Rent from "../app/models/Rent";
import Genre from "../app/models/Genre";
import Platform from "../app/models/Platform";
import GameRent from "../app/models/GameRent";

const models = [User, Platform, Genre, Game, Rent, GameRent];

class Database {
   constructor() {
      this.connection = new Sequelize(development);
      this.init();
      this.associate();
   }

   init() {
      models.forEach((model) => model.init(this.connection));
   }

   associate() {
      models.forEach((model) => {
         if (model.associate) {
            model.associate(this.connection.models);
         }
      });
   }
}

export default new Database();
