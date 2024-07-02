const express = require('express');
const router = express.Router();
const AppointmentController = require('../controllers/AppointmentController');

router.post('/create_appointment', AppointmentController.createAppointment);
router.put('/update_status/:id', AppointmentController.updateStatus);

module.exports = router;