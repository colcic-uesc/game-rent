"use strict";

module.exports = {
   up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert(
         "platforms",
         [
            {
               name: "Xbox One",
               created_at: new Date(),
               updated_at: new Date(),
            },
            {
               name: "Xbox Series",
               created_at: new Date(),
               updated_at: new Date(),
            },
            {
               name: "PS3",
               created_at: new Date(),
               updated_at: new Date(),
            },
            {
               name: "PS4",
               created_at: new Date(),
               updated_at: new Date(),
            },
            {
               name: "PS5",
               created_at: new Date(),
               updated_at: new Date(),
            },
            {
               name: "Nintendo Switch",
               created_at: new Date(),
               updated_at: new Date(),
            },
            {
               name: "Nintendo Switch 2",
               created_at: new Date(),
               updated_at: new Date(),
            },
         ],
         {}
      );
   },

   down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete("platforms", null, {});
   },
};
