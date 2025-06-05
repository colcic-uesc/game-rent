import Payment from '../models/Payments';
import { emailPagamento } from '../../config/apiEmail';
import sequelize from 'sequelize';
import { tr } from 'date-fns/locale';

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
      // console.log("Dados do pagamento:", { id_aluguel, valor, metodo, status });
      const payment = await Payment.create({ id_aluguel, valor, metodo, status });
      

      // if (status == 'aprovado') {
        
      // emailPagamento(
      //   "Igor",
      //   "igoruser07@gmail.com",
      //   req.body.valor,
      // );
      // }


      return res
        .status(201)
        .json({ message: "Pagamento criado com sucesso", data: payment })
        .send(emailContent);
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

  // Envia um email de simulação de pagamento
  // (a ser implementado)  
  async simulaEmail(req, res) {
    const { pagamentoId } = req.params;
    const t = await sequelize.Transaction();

    try {
      
    } catch (error) {
      
    }
  }
}
export default new PaymentsController();
