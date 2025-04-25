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
         return res.status(404).json();
      }

      return res.json(platform);
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

      const { id, name, createdAt, updatedAt } = await Platform.create(
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

      const platform = await Platform.findByPk(req.params.id);

      if (!platform) {
         return res.status(404).json();
      }

      const { id, name, createdAt, updatedAt } = await platform.update(
         req.body
      );

      return res.status(201).json({ id, name, createdAt, updatedAt });
   }

   async destroy(req, res) {
      const platform = await Platform.findByPk(req.params.id);

      if (!platform) {
         return res.status(404).json();
      }

      await platform.destroy();

      return res.json();
   }
}

export default new PlatformsController();
