import * as Yup from "yup";
import { Op } from "sequelize";

import Game from "../models/Game";
import Genre from "../models/Genre";
import Platform from "../models/Platform";

class GamesController {
   async index(req, res) {
      const { title, status, sort } = req.query;

      const page = req.query.page || 1;
      const limit = req.query.limit || 25;

      let where = {};
      let order = [];

      if (title) {
         where = {
            ...where,
            title: {
               [Op.substring]: title,
            },
         };
      }

      if (status) {
         where = {
            ...where,
            status: {
               [Op.like]: status,
            },
         };
      }

      if (sort) {
         order = sort.split(",").map((item) => item.split(":"));
      }

      const games = await Game.findAll({
         attributes: {
            exclude: [
               "platform_id",
               "genre_id",
               "PlatformId",
               "GenreId",
               "createdAt",
               "updatedAt",
            ],
         },
         where,
         include: [
            {
               model: Genre,
               as: "genre",
               attributes: ["id", "name"],
            },
            {
               model: Platform,
               as: "platform",
               attributes: ["id", "name"],
            },
         ],
         order,
         limit,
         offset: limit * page - limit,
      });

      return res.json(games);
   }

   async show(req, res) {
      const game = await Game.findByPk(req.params.id, {
         include: [
            {
               model: Genre,
               as: "genre",
               attributes: ["id", "name"],
            },
            {
               model: Platform,
               as: "platform",
               attributes: ["id", "name"],
            },
         ],
      });

      if (!game) {
         return res.status(404).json();
      }

      return res.json(game);
   }

   async create(req, res) {
      const schema = Yup.object().shape({
         title: Yup.string().required(),
         description: Yup.string().required(),
         price: Yup.number().required(),
         status: Yup.string().required(),
         yt_link: Yup.string().required(),
         capa_jogo: Yup.string().required(),
         platform_id: Yup.number().integer().required(),
         genre_id: Yup.number().integer().required(),
      });

      if (!(await schema.isValid(req.body))) {
         return res.status(400).json({
            error: "Error on validate schema.",
         });
      }

      const { id, title, createdAt, updatedAt } = await Game.create(req.body);

      return res.status(201).json({ id, title, createdAt, updatedAt });
   }

   async update(req, res) {
      const schema = Yup.object().shape({
         title: Yup.string().required(),
         description: Yup.string().required(),
         price: Yup.number().required(),
         status: Yup.string().required(),
         yt_link: Yup.string().required(),
         capa_jogo: Yup.string().required(),
         platform_id: Yup.number().integer().required(),
         genre_id: Yup.number().integer().required(),
      });

      if (!(await schema.isValid(req.body))) {
         return res.status(400).json({
            error: "Error on validate schema.",
         });
      }

      const game = await Game.findByPk(req.params.id);

      if (!game) {
         return res.status(404).json();
      }

      const { id, title, createdAt, updatedAt } = await game.update(req.body);

      return res.status(201).json({ id, title, createdAt, updatedAt });
   }

   async destroy(req, res) {
      const game = await Game.findByPk(req.params.id);

      if (!game) {
         return res.status(404).json();
      }

      await game.destroy();

      return res.json();
   }
}

export default new GamesController();
