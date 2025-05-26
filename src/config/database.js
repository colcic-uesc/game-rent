require("dotenv/config");

module.exports = {
<<<<<<< HEAD
   dialect: "mysql",
   host: process.env.DB_HOST,
   username: process.env.DB_USER,
   password: process.env.DB_PASS,
   database: process.env.DB_NAME,
   dialectModule: require('mysql2'),
   define: {
      timestamps: true, // cria duas colunas: createdAt e updatedAt
      underscored: true,
      underscoredAll: true,
=======
   development: {
      dialect: "mysql",
      host: process.env.DB_HOST,
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      define: {
         timestamps: true,
         underscored: true,
         underscoredAll: true,
      },
   },
   test: {
      dialect: "mysql",
      host: process.env.DB_HOST,
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME + "_test",
      define: {
         timestamps: true,
         underscored: true,
         underscoredAll: true,
      },
   },
   production: {
      dialect: "mysql",
      host: process.env.DB_HOST,
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      define: {
         timestamps: true,
         underscored: true,
         underscoredAll: true,
      },
>>>>>>> igor_novo
   },
};
