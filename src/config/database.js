require("dotenv/config");

module.exports = {
   dialect: "mysql",
   host: process.env.DB_HOST,
   username: process.env.DB_USER,
   password: process.env.DB_PASSWORD,
   database: process.env.DB_NAME,
   dialectModule: require('mysql2'),
   define: {
      timestamps: true, // cria duas colunas: createdAt e updatedAt
      underscored: true,
      underscoredAll: true,
   },
};
