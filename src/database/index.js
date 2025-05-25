import Sequelize from "sequelize";

import config from "../config/database";

import User from "../app/models/User";
import Game from "../app/models/Game";
import Genre from "../app/models/Genre";
import Platform from "../app/models/Platform";
import Aluguel from "../app/models/Aluguel";
import AluguelJogos from "../app/models/AluguelJogos";


const models = [User, Platform, Genre, Game, Aluguel,AluguelJogos];

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
      models.forEach((model) => {
         if (model.associate) {
            model.associate(this.connection.models);
         }
      });
   }
}

export default new Database();
