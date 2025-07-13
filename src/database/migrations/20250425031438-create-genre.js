"use strict";

module.exports = {
   up: (queryInterface, Sequelize) => {
      return queryInterface.createTable("genres", {
         id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
         },
         name: {
            type: Sequelize.STRING,
            allowNull: false,
         },
         is_active: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: true,
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
   down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable("genres");
   },
};
