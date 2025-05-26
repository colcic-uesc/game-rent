import Sequelize from "sequelize";

import config from "../config/database";

import User from "../app/models/User";
import Game from "../app/models/Game";
import Genre from "../app/models/Genre";
import Platform from "../app/models/Platform";
import Rent from "../app/models/Rent";

const models = [User, Platform, Genre, Game, Rent];

class Database {
   constructor() {
      this.connection = new Sequelize(config);
      this.init();
      this.associate();
   }

   init() {
      models.forEach((model) => model.init(this.connection));
   }

   associate() {
      Object.values(this.connection.models).forEach((model) => {
         if (model.associate) {
            model.associate(this.connection.models);
         }
      });
   }
}

export default new Database();
