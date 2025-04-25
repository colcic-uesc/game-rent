import * as Yup from "yup";

import Platform from "../models/Platform";

class PlatformsController {
   async index(req, res) {
      const platforms = await Platform.findAll({
         order: [["name", "ASC"]],
         attributes: ["id", "name", "createdAt", "updatedAt"],
      });

      return res.json(platforms);
   }

   async show(req, res) {
      const platform = await Platform.findByPk(req.params.id);

      if (!platform) {
         return res.status(404).json({
            message: "Plataforma não encontrada.",
         });
      }

      return res.json(platform);
   }

   async create(req, res) {
      const schema = Yup.object().shape({
         name: Yup.string().required("Nome da plataforma é obrigatório"),
      });

      if (!(await schema.isValid(req.body))) {
         return res.status(400).json({
            error: "Erro na validação dos dados.",
         });
      }

      const platform = await Platform.findOne({
         where: {
            name: req.body.name,
         },
      });

      if (platform) {
         return res.status(400).json({
            error: "Plataforma já existe.",
         });
      }

      await Platform.create(req.body);

      return res.status(201).json({
         message: `Plataforma criada com sucesso`,
      });
   }

   async update(req, res) {
      const schema = Yup.object().shape({
         name: Yup.string().required("Nome da plataforma é obrigatório"),
      });

      if (!(await schema.isValid(req.body))) {
         return res.status(400).json({
            error: "Erro na validação dos dados.",
         });
      }

      const platform = await Platform.findByPk(req.params.id);

      if (!platform) {
         return res.status(404).json({
            message: "Plataforma não encontrada.",
         });
      }

      await platform.update(req.body);

      return res
         .status(200)
         .json({ message: "Plataforma atualizada com sucesso" });
   }

   async destroy(req, res) {
      const platform = await Platform.findByPk(req.params.id);

      if (!platform) {
         return res.status(404).json({ message: "Plataforma não encontrada." });
      }

      await platform.destroy();

      return res
         .status(204)
         .json({ message: "Plataforma excluída com sucesso" });
   }
}

export default new PlatformsController();
