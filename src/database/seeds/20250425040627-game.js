"use strict";

module.exports = {
   up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert(
         "games",
         [
            {
               title: "God of War Origins Collection",
               description: "Ação e aventura em um mundo mitológico.",
               price: 69.90,
               status: "available",
               yt_link: "https://www.youtube.com/watch?v=1o-tsWL6IAc&pp=ygUlZ29kIG9mIHdhciBvcmlnaW5zIGNvbGxlY3Rpb24gdHJhaWxlcg%3D%3D",
               capa_jogo: "/tmp/games/god_of_war_origins_collection.jpg",
               platform_id: 4,
               genre_id: 5,
               created_at: new Date(),
               updated_at: new Date(),
            },
            {
               title: "Gears of War E-Day",
               description: "Ação e aventura em um mundo invadido por alienígenas.",
               price: 29.90,
               status: "available",
               yt_link: "https://www.youtube.com/watch?v=EC20gLfUHeA&pp=ygUSZ2VhcnMgb2Ygd2FyIGUtZGF5",
               capa_jogo: "/tmp/games/gears_of_war_e_day.jpg",
               platform_id: 2,
               genre_id: 7,
               created_at: new Date(),
               updated_at: new Date(),
            },
            {
               title: "EA FC25",
               description: "Futebol com gráficos impressionantes e jogabilidade realista.",
               price: 189.90,
               status: "available",
               yt_link: "https://www.youtube.com/watch?v=pBM2xyco_Kg&pp=ygUQdHJhaWxlciBlYSBmYyAyNQ%3D%3D",
               capa_jogo: "/tmp/games/ea_fc_25.jpg",
               platform_id: 5,
               genre_id: 9,
               created_at: new Date(),
               updated_at: new Date(),
            },
         ],
         {}
      );
   },

   down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete("games", null, {});
   },
};
