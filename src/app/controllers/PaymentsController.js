import PaymentService from '../models/Payments';

class PaymentsController {
    // Lista todos os pagamentos
    async index(req, res) {
        try {
            const payments = await PaymentService.getAllPayments();
            return res.status(200).json(payments);
        } catch (error) {
            return res.status(500).json({ error: `Erro ao listar pagamentos.`});
        }
    }

    // Busca um pagamento por ID
    async show(req, res) {
        try {
            
            const { id } = req.params;
            const payment = await PaymentService.getPaymentById(id);
            if (!payment) {
                return res.status(404).json({ error: 'Pagamento não encontrado.' });
            }
            return res.status(200).json(payment);
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao buscar pagamento.' });
        }
    }

    // Cria um novo pagamento
    async create(req, res) {
        try {
            const paymentData = req.body;
            const payment = await PaymentService.createPayment(paymentData);
            return res.status(201).json(payment);
        } catch (error) {
            console.log(req.body)
            console.log('oi')
            return res.status(400).json({ error: 'Erro ao criar pagamento.' });
        }
    }

    // Atualiza um pagamento existente
    async update(req, res) {
        try {
            const { id } = req.params;
            const paymentData = req.body;
            const updatedPayment = await PaymentService.updatePayment(id, paymentData);
            if (!updatedPayment) {
                return res.status(404).json({ error: 'Pagamento não encontrado.' });
            }
            return res.status(200).json(updatedPayment);
        } catch (error) {
            return res.status(400).json({ error: 'Erro ao atualizar pagamento.' });
        }
    }

    // Remove um pagamento
    async destroy(req, res) {
        try {
            const { id } = req.params;
            const deleted = await PaymentService.deletePayment(id);
            if (!deleted) {
                return res.status(404).json({ error: 'Pagamento não encontrado.' });
            }
            return res.status(204).send();
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao remover pagamento.' });
        }
    }
}

module.exports = new PaymentsController();