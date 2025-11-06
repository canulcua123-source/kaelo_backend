
const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');

// @route   POST api/auth/register
// @desc    Registrar un usuario
// @access  Public
router.post('/register', register);

// @route   POST api/auth/login
// @desc    Autenticar un usuario y obtener token
// @access  Public
router.post('/login', login);

module.exports = router;
