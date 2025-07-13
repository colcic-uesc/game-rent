"use strict";

module.exports = {
   up: (queryInterface, Sequelize) => {
      return queryInterface.createTable("games", {
         id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
         },
         title: {
            type: Sequelize.STRING,
            allowNull: false,
         },
         description: {
            type: Sequelize.STRING,
            allowNull: false,
         },
         price: {
            type: Sequelize.FLOAT,
            allowNull: false,
         },
         status: {
            type: Sequelize.ENUM("available", "paused", "unavailable"),
            defaultValue: "available",
            allowNull: false,
         },
         yt_link: {
            type: Sequelize.STRING,
            allowNull: false,
         },
         capa_jogo: {
            type: Sequelize.STRING,
            allowNull: false,
         },
         is_active: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: true,
         },
         platform_id: {
            type: Sequelize.INTEGER,
            references: {
               model: "platforms",
               key: "id",
            },
            onUpdate: "CASCADE",
            onDelete: "SET NULL",
            allowNull: true,
         },
         genre_id: {
            type: Sequelize.INTEGER,
            references: {
               model: "genres",
               key: "id",
            },
            onUpdate: "CASCADE",
            onDelete: "SET NULL",
            allowNull: true,
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
   down: (queryInterface) => {
      return queryInterface.dropTable("games");
   },
};
