const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/verifyToken');
const AppointmentController = require('../controllers/AppointmentController');

router.post('/create_appointment', verifyToken, AppointmentController.createAppointment);
router.delete('/delete_appointment/:id', verifyToken, AppointmentController.deleteAppointment);
// router.put('/update_status/:id', verifyToken, AppointmentController.updateStatus);
router.put('/update_appointment/:id', verifyToken, AppointmentController.updateAppointment);

module.exports = router;