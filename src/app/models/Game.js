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

      // Um jogo pode ter muitos aluguéis
      this.hasMany(models.Rent, { foreignKey: "game_id", as: "alugueis" });
   }
}

export default Game;
