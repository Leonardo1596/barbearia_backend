const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/verifyToken');
const ServiceController = require('../controllers/ServiceController');

router.post('/create_service', verifyToken, ServiceController.createService);
router.delete('/delete_service/:id', verifyToken, ServiceController.deleteService);
router.put('/update_service/:id', verifyToken, ServiceController.updateService);

module.exports = router;