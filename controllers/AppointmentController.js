const Appointment = require('../models/AppointmentSchema');
const Transaction = require('../models/Transaction');

const createAppointment = async (req, res) => {
    try {
        const { barber, services, client_name, date, hour, status } = req.body;

        const existingAppointment = await Appointment.findOne({ date: date, hour: hour });

        // Check if there is an appointment with the same date and hour
        if (existingAppointment) {
            return res.status(409).json({ error: 'Já existe um agendamento para este horário e data.' });
        }

        const newAppointment = new Appointment({ barber, service: services, client_name, date, hour, status });
        await newAppointment.save();
        res.status(201).json(newAppointment);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Erro ao criar agendamento' });
    };
};

const deleteAppointment = async (req, res) => {
    const { id } = req.params;

    try {
        // Search and delete the appointment by ID
        const deletedAppointment = await Appointment.findByIdAndDelete(id);

        if (!deletedAppointment) {
            return res.status(404).json({ error: 'Agendamento não encontrado' });
        }

        res.status(200).json({ message: 'Agendamento excluído com sucesso' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao excluir agendamento' });
    }
};


const updateAppointment = async (req, res) => {
    const { id } = req.params;
    const { barber, services, client_name, date, hour, status } = req.body;

    try {
        // Search the appointment by ID
        const appointment = await Appointment.findById(id).populate('service');

        if (!appointment) {
            return res.status(404).json({ error: 'Agendamento não encontrado' });
        }

        // Update field of appointment
        if (barber) appointment.barber = barber;
        if (services) appointment.service = services;
        if (client_name) appointment.client_name = client_name;
        if (date) appointment.date = date;
        if (hour) appointment.hour = hour;

        // If field 'status' was updated
        if (status) {
            appointment.status = status;

            // Executa a lógica de 'Concluído'
            if (status === 'Concluído') {
                const totalPrice = appointment.service.reduce((total, service) => total + service.price, 0);

                // Create a transaction with total value of services
                const newTransaction = new Transaction({
                    appointment: appointment._id,
                    barber: appointment.barber,
                    barber_amount: totalPrice
                });

                await newTransaction.save();
            }
        }

        await appointment.save();

        res.status(200).json(appointment);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Erro ao atualizar o agendamento' });
    }
};


module.exports = {
    createAppointment,
    deleteAppointment,
    updateAppointment
}