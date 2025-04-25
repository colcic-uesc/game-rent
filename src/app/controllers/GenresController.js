import * as Yup from "yup";

import Genre from "../models/Genre";

class GenresController {
   async index(req, res) {
      const genres = await Genre.findAll({
         order: [["name", "ASC"]],
         attributes: ["id", "name", "createdAt", "updatedAt"],
      });

      return res.json(genres);
   }

   async show(req, res) {
      const genre = await Genre.findByPk(req.params.id);

      if (!genre) {
         return res.status(404).json();
      }

      return res.json(genre);
   }

   async create(req, res) {
      const schema = Yup.object().shape({
         name: Yup.string().required(),
      });

      if (!(await schema.isValid(req.body))) {
         return res.status(400).json({
            error: "Error on validate schema.",
         });
      }

      const { id, name, createdAt, updatedAt } = await Genre.create(
         req.body
      );

      return res.status(201).json({ id, name, createdAt, updatedAt });
   }

   async update(req, res) {
      const schema = Yup.object().shape({
         name: Yup.string(),
      });

      if (!(await schema.isValid(req.body))) {
         return res.status(400).json({
            error: "Error on validate schema.",
         });
      }

      const genre = await Genre.findByPk(req.params.id);

      if (!genre) {
         return res.status(404).json();
      }

      const { id, name, createdAt, updatedAt } = await genre.update(
         req.body
      );

      return res.status(201).json({ id, name, createdAt, updatedAt });
   }

   async destroy(req, res) {
      const genre = await Genre.findByPk(req.params.id);

      if (!genre) {
         return res.status(404).json();
      }

      await genre.destroy();

      return res.json();
   }
}

export default new GenresController();
