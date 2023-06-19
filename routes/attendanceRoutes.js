const express = require('express');
const router = express.Router();

// Import the attendance controller functions
const attendanceController = require('../controllers/attendanceController');

// Routes for attendance
router.get('/', attendanceController.getAllAttendance);
router.get('/:id', attendanceController.getAttendanceById);
router.post('/', attendanceController.createAttendance);
router.put('/:id', attendanceController.updateAttendance);
router.delete('/:id', attendanceController.deleteAttendance);

module.exports = router;
