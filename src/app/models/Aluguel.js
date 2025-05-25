"use strict";

import Sequelize, { Model } from "sequelize";

class Aluguel extends Model {
   static init(sequelize) {
      super.init(
         {
            id_usuario: Sequelize.INTEGER,
            data_aluguel: Sequelize.DATE,
            data_devolucao: Sequelize.DATE,
            status: Sequelize.STRING,
         },
         {
            sequelize,
            tableName: "alugueis",
         }
      );
   }

   static associate(models) {
      this.belongsTo(models.User, { foreignKey: "id_usuario", as: "usuario" });

      // Muitos jogos em um aluguel
      this.belongsToMany(models.Game, {
         through: models.AluguelJogos,
         as: "jogos",
         foreignKey: "id_aluguel",
         otherKey: "id_jogo",
      });
   }
}

module.exports = Aluguel;
