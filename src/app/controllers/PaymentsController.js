import Payment from '../models/Payments';
import { emailPagamento } from '../../config/apiEmail';

class PaymentsController {
  // Lista todos os pagamentos
  async index(req, res) {
    try {
      const payments = await Payment.findAll();

      return res
        .status(200)
        .json({ message: "Pagamentos listados com sucesso", data: payments });


    } catch (error) {
      return res.status(400).json({
        error: "Erro ao listar pagamentos.",
        details: error.message,
      });
    }
  }

  // Lista um pagamento específico
  async show(req, res) {
    try {
      const { id } = req.params;
      const payment = await Payment.findByPk(id);
      if (!payment) {
        return res.status(404).json({ error: "Pagamento não encontrado." });
      }
      return res.status(200).json({ message: "Pagamento encontrado com sucesso", data: payment });
    } catch (error) {
      return res.status(400).json({
        error: "Erro ao listar pagamento.",
        details: error.message,
      });
    }
  }

  // Cria um novo pagamento
  async create(req, res) {
    try {
      const { id_aluguel, valor, metodo, status } = req.body;
      const payment = await Payment.create({ id_aluguel, valor, metodo, status });

      return res
        .status(201)
        .json({ message: "Pagamento criado com sucesso", data: payment });
    } catch (error) {
      return res.status(400).json({
        error: "Erro ao criar pagamento.",
        details: error.message,
      });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const { id_aluguel, valor, metodo, status } = req.body;

      const payment = await Payment.findByPk(id);
      if (!payment) {
        return res.status(404).json({ error: "Pagamento não encontrado." });
      }

      await payment.update({ id_aluguel, valor, metodo, status });

      return res
        .status(200)
        .json({ message: "Pagamento atualizado com sucesso", data: payment });
    } catch (error) {
      return res.status(400).json({
        error: "Erro ao atualizar pagamento.",
        details: error.message,
      });
    }
  }

  async simulaEmail(req, res) {
    const { pagamentoId } = req.params;
    const { nome, email } = req.body;

    if (!nome || !email) {
      return res.status(400).json({ error: "Nome e email são obrigatórios." });
    }

    try {
      const pagamento = await Payment.findByPk(pagamentoId);

      if (!pagamento) {
        return res.status(404).json({ error: 'Pagamento não encontrado.' });
      }

      await emailPagamento(nome, email, pagamento.valor);

      return res.status(200).json({ message: 'E-mail de simulação enviado com sucesso.' });

    } catch (error) {
      return res.status(500).json({
        error: 'Erro ao enviar e-mail.',
        details: error.message
      });
    }
  }


}
export default new PaymentsController();
