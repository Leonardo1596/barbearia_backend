const express = require('express');
const router = express.Router();
const ServiceController = require('../controllers/ServiceController');

router.post('/create_service', ServiceController.createService);

module.exports = router;