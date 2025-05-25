"use strict";

module.exports = {
   async up(queryInterface, Sequelize) {
      await queryInterface.createTable("aluguel_jogos", {
         id_aluguel: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
               model: "alugueis",
               key: "id",
            },
            onUpdate: "CASCADE",
            onDelete: "CASCADE",
            primaryKey: true,
         },
         id_jogo: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
               model: "games",
               key: "id",
            },
            onUpdate: "CASCADE",
            onDelete: "CASCADE",
            primaryKey: true,
         },
         created_at: {
            allowNull: false,
            type: Sequelize.DATE,
         },
         updated_at: {
            allowNull: false,
            type: Sequelize.DATE,
         },
      });
   },

   async down(queryInterface, Sequelize) {
      await queryInterface.dropTable("aluguel_jogos");
   },
};
