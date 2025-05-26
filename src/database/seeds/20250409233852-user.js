"use strict";

const { is } = require("sequelize/types/lib/operators");

module.exports = {
   up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert(
         "users",
         [
            {
               name: "John Doe",
               email: "john@gmail.com",
               tipo: "admin",
               is_active: true,
               password_hash: "$2a$08$e0b1c4f8d3a5e7c5f8d3eO9Q6Z5J6F5F5F5F5F5F5F5F5F5F5F5",
               created_at: new Date(),
               updated_at: new Date(),
            },
            {
               name: "Jane Doe",
               email: "jane@gmail.com",
               tipo: "user",
               is_active: true,
               password_hash: "$2a$08$e0b1c4f8d3a5e7c5f8d3eO9Q6Z5J6F5F5F5F5F5F5F5F5F5F5F5",
               created_at: new Date(),
               updated_at: new Date(),
            }
         ],
         {}
      );
   },

   down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete("users", null, {});
   },
};
