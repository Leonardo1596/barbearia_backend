const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TransactionSchema = new Schema({
    appointment: {
        type: Schema.Types.ObjectId,
        ref: 'Appointment',
        required: true
    },
    barber: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    barber_amount: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
}, { collection: 'Transaction' });

module.exports = mongoose.model('Transaction', TransactionSchema);