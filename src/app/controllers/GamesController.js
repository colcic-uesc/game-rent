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
         return res.status(404).json({ message: "Jogo não encontrado." });
      }

      return res.json(game);
   }

   isValidFileType(fileName, fileType) {
      const validFileExtensions = {
         image: ["jpg", "png", "jpeg", "webp"],
      };
      return (
         fileName &&
         validFileExtensions[fileType].indexOf(fileName.split(".").pop()) > -1
      );
   }

   async create(req, res) {
      const MAX_FILE_SIZE = 2000000; // 2MB

      const schema = Yup.object().shape({
         title: Yup.string().required("Title is required"),
         description: Yup.string().required("Description is required"),
         price: Yup.number().required("Price is required"),
         status: Yup.string().required("Status is required"),
         yt_link: Yup.string().required("YouTube link is required"),
         platform_id: Yup.number().integer().required(),
         genre_id: Yup.number().integer().required(),
      });

      const fileSchema = Yup.object().shape({
         capa_jogo: Yup.mixed()
            .required("File is required")
            .test("is-valid-type", "Not a valid image type", (value) =>
               // eslint-disable-next-line no-undef
               isValidFileType(value && value.name.toLowerCase(), "image")
            )
            .test(
               "is-valid-size",
               "Max allowed size is 2MB",
               (value) => value && value.size <= MAX_FILE_SIZE
            ),
      });

      if (
         !(await schema.isValid(req.body)) &&
         !(await fileSchema.isValid(req.file))
      ) {
         return res.status(400).json({
            error: "Erro na validação dos dados.",
         });
      }

      const game = await Game.findOne({
         where: {
            title: req.body.title,
            platform_id: req.body.platform_id,
            genre_id: req.body.genre_id,
         },
      });

      if (game) {
         return res.status(400).json({
            error: "Jogo já cadastrado.",
         });
      }

      const formData = {
         ...req.body,
         capa_jogo: req.file.filename,
      };

      await Game.create(formData);

      return res.status(201).json({ message: "Jogo cadastrado com sucesso." });
   }

   async update(req, res) {
      const MAX_FILE_SIZE = 2000000; // 2MB

      const schema = Yup.object().shape({
         title: Yup.string().required("Title is required"),
         description: Yup.string().required("Description is required"),
         price: Yup.number().required("Price is required"),
         status: Yup.string().required("Status is required"),
         yt_link: Yup.string().required("YouTube link is required"),
         platform_id: Yup.number().integer().required(),
         genre_id: Yup.number().integer().required(),
      });

      const fileSchema = Yup.object().shape({
         capa_jogo: Yup.mixed()
            .required("File is required")
            .test("is-valid-type", "Not a valid image type", (value) =>
               // eslint-disable-next-line no-undef
               isValidFileType(value && value.name.toLowerCase(), "image")
            )
            .test(
               "is-valid-size",
               "Max allowed size is 2MB",
               (value) => value && value.size <= MAX_FILE_SIZE
            ),
      });

      if (
         !(await schema.isValid(req.body)) &&
         !(await fileSchema.isValid(req.file))
      ) {
         return res.status(400).json({
            error: "Erro na validação dos dados.",
         });
      }

      const game = await Game.findByPk(req.params.id);

      if (!game) {
         return res.status(404).json({ message: "Jogo não encontrado." });
      }

      await game.update(req.body);

      return res.status(200).json({ message: "Jogo atualizado com sucesso." });
   }

   async destroy(req, res) {
      const game = await Game.findByPk(req.params.id);

      if (!game) {
         return res.status(404).json({ message: "Jogo não encontrado." });
      }

      await game.destroy();

      return res.status(204).json({ message: "Jogo excluído com sucesso." });
   }
}

export default new GamesController();
