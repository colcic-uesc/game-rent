import Payment from '../models/Payments';
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

}
export default new PaymentsController();
