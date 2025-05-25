import Aluguel from "../models/Aluguel";
import AluguelJogos from "../models/AluguelJogos";
import Game from "../models/Game";

class AluguelController {
  async store(req, res) {
    const { jogo_ids } = req.body;
    const id_usuario = req.userId;

    if (!Array.isArray(jogo_ids) || jogo_ids.length === 0) {
      return res.status(400).json({ error: "É preciso informar ao menos um jogo para alugar" });
    }

    try {
      const data_aluguel = new Date();

      const aluguel = await Aluguel.create({
        id_usuario,
        data_aluguel,
        status: 'em andamento',
      });

      const associacoes = jogo_ids.map(id_jogo => ({
        id_aluguel: aluguel.id,
        id_jogo
      }));

      await AluguelJogos.bulkCreate(associacoes);

      return res.status(201).json({ message: "Aluguel criado com sucesso", aluguel });
    } catch (error) {
      return res.status(500).json({ error: "Erro ao criar aluguel", detalhes: error.message });
    }
  }

  async index(req, res) {
    const id_usuario = req.userId;

    try {
      const alugueis = await Aluguel.findAll({
        where: { id_usuario },
        include: [
          {
            model: Game,
            as: "jogos",
            through: { attributes: [] },
          },
        ],
        order: [['data_aluguel', 'DESC']],
      });

      return res.json(alugueis);
    } catch (error) {
      return res.status(500).json({ error: "Erro ao buscar aluguéis", detalhes: error.message });
    }
  }

  async show(req, res) {
    const { id } = req.params;
    const id_usuario = req.userId;

    try {
      const aluguel = await Aluguel.findOne({
        where: { id, id_usuario },
        include: [
          {
            model: Game,
            as: "jogos",
            through: { attributes: [] },
          },
        ],
      });

      if (!aluguel) {
        return res.status(404).json({ error: "Aluguel não encontrado ou não pertence ao usuário" });
      }

      return res.json(aluguel);
    } catch (error) {
      return res.status(500).json({ error: "Erro ao buscar aluguel", detalhes: error.message });
    }
  }

  async finalizar(req, res) {
    const { id } = req.params;
    const id_usuario = req.userId;

    try {
      const aluguel = await Aluguel.findOne({ where: { id, id_usuario } });

      if (!aluguel) {
        return res.status(404).json({ error: "Aluguel não encontrado ou não pertence ao usuário" });
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

      return res.json({ message: "Aluguel finalizado com sucesso", aluguel });
    } catch (error) {
      return res.status(500).json({ error: "Erro ao finalizar aluguel", detalhes: error.message });
    }
  }
}

export default new AluguelController();
