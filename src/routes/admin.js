const express = require('express');
const router = express.Router();
const { getDashboardStats } = require('../controllers/adminController');
const authAdmin = require('../middlewares/authAdmin');

// @route   GET api/admin/dashboard
// @desc    Obtener estadísticas para el dashboard de admin
// @access  Private (Admin)
router.get('/dashboard', authAdmin, getDashboardStats);

module.exports = router;
