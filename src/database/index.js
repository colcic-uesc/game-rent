import Sequelize from "sequelize";

import config from "../config/database";

import User from "../app/models/User";

const models = [User];

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
