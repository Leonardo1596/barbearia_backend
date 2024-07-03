const Transaction = require('../models/Transaction');
const User = require('../models/UserSchema');

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

const getTransactions = async (req, res) => {
    try {
        const { userId } = req.params;
        const retrievedTransactions = await Transaction.find({ barber: userId }).populate('appointment');
        const totalAmount = retrievedTransactions.reduce((total, obj) => total + obj.barber_amount, 0);

        res.status(200).json({ retrievedTransactions, totalAmount });

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Não foi possível recuperar as transações' });
    }
};

module.exports = {
    createTransaction,
    getTransactions
};