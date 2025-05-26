import * as Yup from "yup";
import { parseISO } from "date-fns";
import { Op } from "sequelize";

import User from "../models/User";
import Aluguel from "../models/Aluguel";
import Game from "../models/Game";
import Platform from "../models/Platform";

class UsersController {
   async index(req, res) {
      const {
         name,
         email,
         createdBefore,
         createdAfter,
         updatedBefore,
         updatedAfter,
         sort,
      } = req.query;

      const page = req.query.page || 1;
      const limit = req.query.limit || 25;

      let where = {};
      let order = [];

      if (name) {
         where = {
            ...where,
            name: {
               [Op.iLike]: name,
            },
         };
      }

      if (email) {
         where = {
            ...where,
            email: {
               [Op.iLike]: email,
            },
         };
      }

      if (createdBefore) {
         where = {
            ...where,
            createdAt: {
               [Op.gte]: parseISO(createdBefore),
            },
         };
      }

      if (createdAfter) {
         where = {
            ...where,
            createdAt: {
               [Op.lte]: parseISO(createdAfter),
            },
         };
      }

      if (updatedBefore) {
         where = {
            ...where,
            updatedAt: {
               [Op.gte]: parseISO(updatedBefore),
            },
         };
      }

      if (updatedAfter) {
         where = {
            ...where,
            updatedAt: {
               [Op.lte]: parseISO(updatedAfter),
            },
         };
      }

      if (sort) {
         order = sort.split(",").map((item) => item.split(":"));
      }

      const data = await User.findAll({
         attributes: { exclude: ["password", "password_hash"] },
         where,
         order,
         limit,
         offset: limit * page - limit,
      });

      console.log({ userId: req.userId });

      return res.json(data);
   }

  async store(req, res) {
    const { name, email, password, tipo } = req.body;

    // 1. Validação simples
    if (!name || !email || !password || !tipo) {
      return res.status(400).json({ error: "Todos os campos são obrigatórios" });
    }

    // 2. Verifica se e-mail já está cadastrado
    const userExists = await User.findOne({ where: { email } });
    if (userExists) {
      return res.status(400).json({ error: "E-mail já está em uso" });
    }

    // 3. Cria o usuário (o hook já criptografa a senha automaticamente)
    const user = await User.create({
      name,
      email,
      password, // apenas o virtual
      tipo,
    });

    // 4. Retorna dados públicos
    return res.status(201).json({
      id: user.id,
      name: user.name,
      email: user.email,
      tipo: user.tipo,
      is_active: user.is_active,
      data_cadastro: user.data_cadastro,
    });
  }


   async show(req, res) {
      const user = await User.findByPk(req.params.id, {
         attributes: { exclude: ["password", "password_hash", "file_id"] },
      });

      if (!user) {
         return res.status(404).json();
      }

      return res.json(user);
   }

   async update(req, res) {
      const schema = Yup.object().shape({
         name: Yup.string(),
         email: Yup.string().email(),
         oldPassword: Yup.string().min(8),
         password: Yup.string()
            .min(8)
            .when("oldPassword", (oldPassword, field) =>
               oldPassword ? field.required() : field
            ),
         passwordConfirmation: Yup.string().when(
            "password",
            (password, field) =>
               password ? field.required().oneOf([Yup.ref("password")]) : field
         ),
      });

      if (!(await schema.isValid(req.body))) {
         return res.status(400).json({
            error: "Error on validate schema.",
         });
      }

      const user = await User.findByPk(req.params.id);

      if (!user) {
         return res.status(404).json();
      }

      const { oldPassword } = req.body;

      if (oldPassword && !(await user.checkPassword(oldPassword))) {
         return res.status(401).json({ error: "User password not match." });
      }

      const { id, name, email, fileId, createdAt, updatedAt } =
         await user.update(req.body);

      return res
         .status(201)
         .json({ id, name, email, fileId, createdAt, updatedAt });
   }

   async destroy(req, res) {
      const user = await User.findByPk(req.params.id);

      if (!user) {
         return res.status(404).json();
      }

      // Soft delete: atualiza is_active para false
      user.is_active = false;
      await user.save();

      return res.status(204).send();
   }

   async history(req, res) {
      const userId = req.params.id;

      // Busca todos os aluguéis do usuário, incluindo detalhes do jogo e plataforma
      const alugueis = await Aluguel.findAll({
         where: { user_id: userId },
         include: [
            {
               model: Game,
               as: "game",
               attributes: ["id", "title"],
               include: [
                  {
                     model: Platform,
                     as: "platform",
                     attributes: ["id", "name"],
                  },
               ],
            },
         ],
         attributes: ["id", "rented_at", "returned_at", "created_at", "updated_at"],
         order: [["rented_at", "DESC"]],
      });

      return res.json(alugueis);
   }
}

export default new UsersController();
