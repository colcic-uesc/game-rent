"use strict";

module.exports = {
   up: (queryInterface, Sequelize) => {
      return queryInterface.createTable("users", {
         id: Sequelize.INTEGER,
         name: Sequelize.STRING,
         email: {
            type: Sequelize.STRING,
            unique: true,
         },
         password_hash: Sequelize.STRING,
      });
   },

   down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable("users");
   },
};
