"use strict";

import Sequelize, { Model } from "sequelize";

class GameRent extends Model {
   static init(sequelize) {
      super.init(
         {
            id_aluguel: Sequelize.INTEGER,
            id_jogo: Sequelize.INTEGER,
         },
         {
            sequelize,
            tableName: "aluguel_jogos",
         }
      );
   }

   static associate(models) {
      this.belongsTo(models.Rent, {
         foreignKey: "id_aluguel",
         as: "aluguel",
      });

      this.belongsTo(models.Game, {
         foreignKey: "id_jogo",
         as: "jogo",
      });
   }
}

module.exports = GameRent;
