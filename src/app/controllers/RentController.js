import Game from "../models/Game";
import Rent from "../models/Rent";
import GameRent from "../models/GameRent";
import Genre from "../models/Genre";
import Platform from "../models/Platform";

class RentsController {
  async index(req, res) {
    try {
      const user = req.user; // Usuário vindo do middleware de autenticação
      let whereClause = {};

      // Se o usuário for um cliente, filtramos pelos alugueis dele
      if (user && user.role === "cliente") {
        whereClause = { id_usuario: user.id };
      }
      // Se for admin, não adiciona filtro, retorna todos

      const alugueis = await Rent.findAll({
        where: whereClause,
        include: [
          {
            model: Game,
            as: "jogos",
            through: {
              attributes: [],
            },
          },
        ],
        order: [["data_aluguel", "DESC"]],
      });

      return res.json(alugueis);
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        detalhes: error.message,
      });
    }
  }

  async show(req, res) {
    const { id } = req.params;
    const user = req.user; // Usuário logado

    try {
      const aluguel = await Rent.findOne({
        where: { id },
        include: [
          {
            model: Game,
            as: "jogos",
            through: {
              attributes: [],
            },
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
          },
        ],
      });

      if (!aluguel) {
        return res.status(404).json({
          error: "Aluguel não encontrado",
        });
      }

      // Se for cliente, garantimos que o aluguel pertence a ele
      if (user && user.role === "cliente" && aluguel.id_usuario !== user.id) {
        return res.status(403).json({
          error: "Acesso negado: Este aluguel não pertence ao usuário logado.",
        });
      }

      return res.json(aluguel);
    } catch (error) {
      return res.status(500).json({ detalhes: error.message });
    }
  }

  async create(req, res) {
    const { jogo_ids, id_usuario } = req.body;

    if (!Array.isArray(jogo_ids) || jogo_ids.length === 0) {
      return res
        .status(400)
        .json({ error: "É preciso informar ao menos um jogo para alugar" });
    }

    try {
      const data_aluguel = new Date();

      const aluguel = await Rent.create({
        id_usuario,
        data_aluguel,
        status: "em andamento",
      });

      const data = jogo_ids.map((id) => ({
        id_aluguel: aluguel.id,
        id_jogo: id,
      }));

      await GameRent.bulkCreate(data);

      return res
        .status(201)
        .json({ message: "Aluguel criado com sucesso", aluguel });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  async update(req, res) {
    const { id } = req.params;

    try {
      const aluguel = await Rent.findOne({ where: { id } });

      if (!aluguel) {
        return res.status(404).json({
          error: "Aluguel não encontrado ou não pertence ao usuário",
        });
      }

      if (aluguel.status === "finalizado") {
        return res.status(400).json({ error: "Aluguel já está finalizado" });
      }

      const data_devolucao = new Date();

      if (data_devolucao < aluguel.data_aluguel) {
        return res.status(400).json({
          error: "Data de devolução não pode ser anterior à data do aluguel",
        });
      }

      aluguel.status = "finalizado";
      aluguel.data_devolucao = data_devolucao;
      await aluguel.save();

      return res.json({
        message: "Aluguel finalizado com sucesso",
        aluguel,
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  }
}

export default new RentsController();
