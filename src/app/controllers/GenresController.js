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
         return res.status(404).json({ message: "Gênero não encontrado." });
      }

      return res.json(genre);
   }

   async create(req, res) {
      const schema = Yup.object().shape({
         name: Yup.string().required("Nome do gênero é obrigatório"),
      });

      if (!(await schema.isValid(req.body))) {
         return res.status(400).json({
            error: "Erro na validação dos dados.",
         });
      }

      const genre = await Genre.findOne({
         where: {
            name: req.body.name,
         },
      });

      if (genre) {
         return res.status(400).json({
            error: "Gênero já existe.",
         });
      }

      await Genre.create(req.body);

      return res.status(201).json({ message: "Gênero criado com sucesso" });
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
         return res.status(404).json({ message: "Gênero não encontrado." });
      }

      await genre.update(req.body);

      return res.status(201).json({ message: "Gênero atualizado com sucesso" });
   }

   async destroy(req, res) {
      const genre = await Genre.findByPk(req.params.id);

      if (!genre) {
         return res.status(404).json({ message: "Gênero não encontrado." });
      }

      await genre.destroy();

      return res.status(204).json({ message: "Gênero deletado com sucesso" });
   }
}

export default new GenresController();
