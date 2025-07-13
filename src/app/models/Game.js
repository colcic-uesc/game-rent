"use strict";

import Sequelize, { Model } from "sequelize";

class Game extends Model {
   static init(sequelize) {
      super.init(
         {
            title: Sequelize.STRING,
            description: Sequelize.STRING,
            price: Sequelize.FLOAT,
            status: Sequelize.STRING,
            yt_link: Sequelize.STRING,
            capa_jogo: Sequelize.STRING,
            platform_id: Sequelize.INTEGER,
            genre_id: Sequelize.INTEGER,
            is_active: Sequelize.BOOLEAN,
         },
         {
            sequelize,
         }
      );
   }

   static associate(models) {
      this.belongsTo(models.Platform, {
         foreignKey: "platform_id",
         as: "platform",
      });

      this.belongsTo(models.Genre, { foreignKey: "genre_id", as: "genre" });

      this.belongsToMany(models.Rent, {
         through: models.GameRent,
         as: "alugueis",
         foreignKey: "id_jogo",
         otherKey: "id_aluguel",
      });
   }
}

export default Game;
