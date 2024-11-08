const Transaction = require('../models/Transaction');
const User = require('../models/UserSchema');

// const createTransaction = async (req, res) => {
//     try {
//         const { appointment } = req.body;

//         const newTransaction = new Transaction({
//             appointment,
//             barber,
//             barber_amount
//         });

//         await newTransaction.save();
//         res.status(201).json(newTransaction);
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ error: 'Error ao criar transação' });
//     }
// };

const deleteTransaction = async (req, res) => {
    const { id } = req.params;

    try {
        // Search and delete the transaction by ID
        const deletedTransaction = await Transaction.findByIdAndDelete(id);

        if (!deletedTransaction) {
            return res.status(404).json({ error: 'Transação não encontrada' });
        }

        res.status(200).json({ message: 'Transação excluída com sucesso' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao excluir transação' });
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
    // createTransaction,
    deleteTransaction,
    getTransactions
};