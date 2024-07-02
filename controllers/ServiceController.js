const Service = require('../models/Service');

const createService = async (req, res) => {
    try {
        const { name, description, price, duration } = req.body;
        const newService = new Service({ name, description, price, duration });
        await newService.save();
        res.status(201).json(newService);

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Erro ao criar o serviço' });
    }
}

module.exports = {
    createService
};