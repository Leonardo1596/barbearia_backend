const Appointment = require('../models/AppointmentSchema');
const Transaction = require('../models/Transaction');

const createAppointment = async (req, res) => {
    try {
        const { barber, service, client_name, date, hour, status } = req.body;

        const newAppointment = new Appointment({ barber, service, client_name, date, hour, status });
        await newAppointment.save();
        res.status(201).json(newAppointment);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Erro ao criar agendamento' });
    };
};

const updateStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    try {
        // Search the appointment by ID
        const appointment = await Appointment.findById(id).populate('service');

        if (!appointment) {
            return res.status(404).json({ error: 'Agendamento não encontrado' });
        }

        // Update the appointment status
        appointment.status = status;

        // Check if status is being updated to 'Concluído'
        if (status === 'Concluído') {
            // Create a transaction with the price service
            const newTransaction = new Transaction({
                appointment: appointment._id,
                barber: appointment.barber,
                barber_amount: appointment.service.price
            });

            await newTransaction.save();
        }

        // Save changes in appointment
        await appointment.save();

        res.status(200).json(appointment);
    } catch (error) {
        console.error(error.message);
    res.status(500).json({ error: 'Erro ao atualizar status do agendamento' });
    }
}

module.exports = {
    createAppointment,
    updateStatus
}