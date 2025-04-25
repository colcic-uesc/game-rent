"use strict";

module.exports = {
   up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert(
         "genres",
         [
            {
               name: "FPS",
               created_at: new Date(),
               updated_at: new Date(),
            },
            {
               name: "Battle Royale",
               created_at: new Date(),
               updated_at: new Date(),
            },
            {
               name: "RPG",
               created_at: new Date(),
               updated_at: new Date(),
            },
            {
               name: "RTS",
               created_at: new Date(),
               updated_at: new Date(),
            },
            {
               name: "Aventura",
               created_at: new Date(),
               updated_at: new Date(),
            },
            {
               name: "RPG de Ação",
               created_at: new Date(),
               updated_at: new Date(),
            },
            {
               name: "Ação",
               created_at: new Date(),
               updated_at: new Date(),
            },
            {
               name: "Puzzle",
               created_at: new Date(),
               updated_at: new Date(),
            },
            {
               name: "Esportes",
               created_at: new Date(),
               updated_at: new Date(),
            },
            {
               name: "Luta",
               created_at: new Date(),
               updated_at: new Date(),
            },
            {
               name: "Sobrevivência",
               created_at: new Date(),
               updated_at: new Date(),
            },
         ],
         {}
      );
   },

   down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete("genres", null, {});
   },
};
