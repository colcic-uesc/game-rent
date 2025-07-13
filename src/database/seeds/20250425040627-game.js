"use strict";

module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert(
      "games",
      [
        {
          title: "Death Stranding 2",
          description:
            "Ação e aventura em um mundo em se não cremar o presunto ele vira uma bomba atômica. Bem a cara do Kojima!",
          price: 49.9,
          status: "available",
          yt_link: "eT_A2gPhTIw",
          capa_jogo: "death_stranding_2_ps4.jpg",
          platform_id: 5,
          genre_id: 5,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          title: "Elden Ring",
          description:
            "Muitas confusões em um mundo em que uma porrada só pode te matar.",
          price: 49.9,
          status: "available",
          yt_link: "K_03kFqWfqs",
          capa_jogo: "elden_ring_ps5.jpg",
          platform_id: 5,
          genre_id: 7,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          title: "Sniper Elite 5",
          description: "Uma headshot à 5km bem dado e eu dormia mansinho.",
          price: 49.9,
          status: "available",
          yt_link: "K_03kFqWfqs",
          capa_jogo: "elden_ring_ps5.jpg",
          platform_id: 4,
          genre_id: 7,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete("games", null, {});
  },
};
