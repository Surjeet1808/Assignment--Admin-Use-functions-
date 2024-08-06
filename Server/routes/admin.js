const express = require('express');
const { createCar, getCars, updateCar, deleteCar, getOneCar } = require('../controllers/adminController');
const { auth, isAdmin } = require('../middleware/auth');

const router = express.Router();

router.post('/cars',auth,isAdmin, createCar);
router.get('/cars', getCars);
router.get('/cars/:id',auth,isAdmin, getOneCar);
router.patch('/cars/:id',auth,isAdmin, updateCar);
router.delete('/cars/:id',auth,isAdmin, deleteCar);

module.exports = router;
