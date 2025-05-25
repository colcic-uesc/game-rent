import Payment from '../models/Payments';

class PaymentsController {
  // Lista todos os pagamentos
  async index(req, res) {
    try {

      const payments = await Payment.findAll({
        order: [['createdAt', 'DESC']],
        attributes: ['id', 'id_aluguel', 'valor', 'data_pagamento', 'metodo', 'status'],
        include: [
          {
            model: Aluguel,
            as: 'aluguel',
            attributes: ['id', 'cliente_id'],
            required: true
          }
        ]
      });

      return res.json({
        success: true,
        data: payments
      });

    } catch (error) {
      console.error("Erro ao listar pagamentos:", error);
      return res.status(500).json({
        success: false,
        error: 'Erro ao listar pagamentos.',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  }
}

export default new PaymentsController();
