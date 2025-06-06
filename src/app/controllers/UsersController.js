import * as Yup from "yup";
import { Op } from "sequelize";
import { parseISO } from "date-fns";

import User from "../models/User";
import Rent from "../models/Rent";
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

      return res.json(data);
   }

   async store(req, res) {
      const schema = Yup.object().shape({
         name: Yup.string().required("Nome é obrigatório"),
         email: Yup.string()
            .email("E-mail inválido")
            .required("E-mail é obrigatório"),
         password: Yup.string()
            .min(8, "A senha deve ter pelo menos 8 caracteres")
            .required("Senha é obrigatória"),
         tipo: Yup.string()
            .oneOf(["admin", "cliente"], "Tipo deve ser 'admin' ou 'cliente'")
            .required("Tipo é obrigatório"),
      });

      if (!(await schema.validate(req.body))) {
         return res.status(400).json({
            error: "Erro de validação",
         });
      }

      const { name, email, password, tipo } = req.body;

      const userExists = await User.findOne({ where: { email } });
      if (userExists) {
         return res.status(400).json({ error: "E-mail já está em uso" });
      }

      const user = await User.create({
         name,
         email,
         password,
         tipo,
      });

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
         email: Yup.string().email("E-mail inválido"),
         oldPassword: Yup.string().min(
            8,
            "A senha atual deve ter pelo menos 8 caracteres"
         ),
         password: Yup.string()
            .min(8, "A nova senha deve ter pelo menos 8 caracteres")
            .when("oldPassword", (oldPassword, field) =>
               oldPassword
                  ? field.required(
                       "Nova senha é obrigatória ao informar a senha atual"
                    )
                  : field
            ),
         passwordConfirmation: Yup.string().when(
            "password",
            (password, field) =>
               password
                  ? field
                       .required("Confirmação de senha é obrigatória")
                       .oneOf([Yup.ref("password")], "As senhas não coincidem")
                  : field
         ),
      });

      if (!(await schema.validate(req.body))) {
         return res.status(400).json({
            error: "Erro de validação",
         });
      }

      const user = await User.findByPk(req.params.id);

      if (!user) {
         return res.status(404).json({
            error: "Usuário não encontrado",
            message: "O usuário com o ID fornecido não existe",
         });
      }

      // Verifica se o e-mail informado é diferente do atual e já existe no banco
      if (req.body.email && req.body.email !== user.email) {
         const userExists = await User.findOne({
            where: { email: req.body.email },
         });
         if (userExists) {
            return res.status(400).json({
               error: "E-mail já está em uso",
               message: "Este e-mail já está sendo utilizado por outro usuário",
            });
         }
      }

      // Verifica se o nome informado corresponde ao nome atual do usuário
      if (req.body.name && req.body.name !== user.name) {
         return res.status(400).json({
            error: "Nome não corresponde",
            message:
               "O nome informado não corresponde ao nome cadastrado para este usuário",
         });
      }

      // Verifica se a senha antiga está correta
      if (
         req.body.oldPassword &&
         !(await user.checkPassword(req.body.oldPassword))
      ) {
         return res.status(401).json({
            error: "Senha atual incorreta",
            message:
               "A senha atual informada não confere com a senha cadastrada",
         });
      }

      // Verifica se a nova senha não é igual à senha atual
      if (
         req.body.password &&
         req.body.oldPassword &&
         (await user.checkPassword(req.body.password))
      ) {
         return res.status(400).json({
            error: "Nova senha inválida",
            message: "A nova senha não pode ser igual à senha atual",
         });
      }

      try {
         // Atualiza o usuário
         const updatedUser = await user.update(req.body);

         return res.status(200).json({
            success: true,
            message: "Usuário atualizado com sucesso",
            user: {
               id: updatedUser.id,
               name: updatedUser.name,
               email: updatedUser.email,
               tipo: updatedUser.tipo,
               is_active: updatedUser.is_active,
               createdAt: updatedUser.createdAt,
               updatedAt: updatedUser.updatedAt,
            },
         });
      } catch (error) {
         return res.status(500).json({
            error: "Erro interno do servidor",
            message: "Ocorreu um erro ao atualizar o usuário. Tente novamente.",
            details: error.message,
         });
      }
   }

   async destroy(req, res) {
      const user = await User.findByPk(req.params.id);

      if (!user) {
         return res.status(404).json({
            error: "Usuário não encontrado",
            message: "O usuário com o ID fornecido não existe",
         });
      }

      // Verifica se o usuário já está desativado
      if (!user.is_active) {
         return res.status(400).json({
            error: "Usuário já desativado",
            message: "Este usuário já está desativado",
         });
      }

      try {
         // Desativa o usuário ao invés de deletar
         await user.update({ is_active: false });

         return res.status(200).json({
            success: true,
            message: "Usuário desativado com sucesso",
         });
      } catch (error) {
         return res.status(500).json({
            error: "Erro interno do servidor",
            message: "Ocorreu um erro ao desativar o usuário. Tente novamente.",
            details: error.message,
         });
      }
   }

   async activate(req, res) {
      const user = await User.findByPk(req.params.id);

      if (!user) {
         return res.status(404).json({
            error: "Usuário não encontrado",
            message: "O usuário com o ID fornecido não existe",
         });
      }

      // Verifica se o usuário já está ativo
      if (user.is_active) {
         return res.status(400).json({
            error: "Usuário já ativo",
            message: "Este usuário já está ativo",
         });
      }

      try {
         // Reativa o usuário
         await user.update({ is_active: true });

         return res.status(200).json({
            success: true,
            message: "Usuário reativado com sucesso",
            user: {
               id: user.id,
               name: user.name,
               email: user.email,
               tipo: user.tipo,
               is_active: true,
               createdAt: user.createdAt,
               updatedAt: user.updatedAt,
            },
         });
      } catch (error) {
         return res.status(500).json({
            error: "Erro interno do servidor",
            message: "Ocorreu um erro ao reativar o usuário. Tente novamente.",
         });
      }
   }

   async history(req, res) {
      try {
         const userId = req.params.id;

         const alugueis = await Rent.findAll({
            where: { id_usuario: userId },
            include: [
               {
                  model: Game,
                  as: "jogos",
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
            attributes: [
               "id",
               "data_aluguel",
               "data_devolucao",
               "created_at",
               "updated_at",
            ],
            order: [["data_aluguel", "DESC"]],
         });

         return res.json(alugueis);
      } catch (err) {
         console.error("Erro no histórico:", err);
         return res.status(500).json({
            error: "Erro interno ao buscar histórico",
            detalhes: err.message,
         });
      }
   }
}

export default new UsersController();
