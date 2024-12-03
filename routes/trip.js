const express = require('express');
const router = express.Router();
const tripsController = require('../Controllers/trips_controller');

// Route để hiển thị tất cả chuyến đi
router.get('/', tripsController.getAllTrips);

// Route để thêm chuyến đi mới
router.get('/add', tripsController.addTripForm);
router.post('/add', tripsController.addTrip);

// Route để chỉnh sửa chuyến đi
router.get('/edit/:id', tripsController.editTripForm);
router.post('/edit/:id', tripsController.editTrip);

// Route để xóa chuyến đi
router.get('/delete/:id', tripsController.deleteTrip);

module.exports = router;
