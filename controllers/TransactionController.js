const Transaction = require('../models/Transaction');

const createTransaction = async (req, res) => {
    try {
        const { appointment, total_amount, barber1, barber1_amount, barber2, barber2_amount } = req.body;

        const newTransaction = new Transaction({
            appointment,
            barber,
            barber_amount
        });

        await newTransaction.save();
        res.status(201).json(newTransaction);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error ao criar transação' });
    }
};

module.exports = {
    createTransaction
};