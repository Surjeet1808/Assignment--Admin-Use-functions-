const express = require('express');
const { register, login, getCars } = require('../controllers/userController');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/cars', getCars);

module.exports = router;
