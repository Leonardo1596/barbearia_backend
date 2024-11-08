const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AppointmentSchema = new Schema({
    barber: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    service: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true }],
    client_name: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    hour: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['Agendado', 'Concluído', 'Cancelado'],
        default: 'Agendado'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
}, { collection: 'Appointment' });

module.exports = mongoose.model('Appointment', AppointmentSchema);