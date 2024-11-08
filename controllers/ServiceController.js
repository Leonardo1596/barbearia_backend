const Service = require('../models/Service');

const createService = async (req, res) => {
    try {
        const { name, description, price } = req.body;
        const newService = new Service({ name, description, price });
        await newService.save();
        res.status(201).json(newService);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Erro ao criar o serviço' });
    }
};

const deleteService = async (req, res) => {
    const { id } = req.params;

    try {
        // Search and delete the service by ID
        const deletedService = await Service.findByIdAndDelete(id);

        if (!deletedService) {
            return res.status(404).json({ error: 'Serviço não encontrado' });
        }

        res.status(200).json({ message: 'Serviço excluído com sucesso' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao excluir o serviço' });
    }
};

const updateService = async (req, res) => {
    const { id } = req.params;
    const updates = req.body;

    try {
        // Update service and returns the updated document
        const updatedService = await Service.findByIdAndUpdate(id, updates, { new: true, runValidators: true });

        if (!updatedService) {
            return res.status(404).json({ error: 'Serviço não encontrado' });
        }

        res.status(200).json(updatedService);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao atualizar o serviço' });
    }
};

module.exports = {
    createService,
    deleteService,
    updateService
};