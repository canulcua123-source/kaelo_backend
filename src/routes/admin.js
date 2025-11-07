const express = require('express');
const router = express.Router();
const { 
  getDashboardStats, 
  getUsers, 
  createUser, 
  updateUser, 
  deleteUser,
  getRoutes,
  createRoute,
  updateRoute,
  deleteRoute,
  getStores,
  createStore,
  updateStore,
  deleteStore,
  getTransactions
} = require('../controllers/adminController');
const authAdmin = require('../middlewares/authAdmin');

// @route   GET api/admin/dashboard
// @desc    Obtener estadísticas para el dashboard de admin
// @access  Private (Admin)
router.get('/dashboard', authAdmin, getDashboardStats);

// --- Gestión de Usuarios ---

// @route   GET api/admin/users
// @desc    Obtener todos los usuarios
// @access  Private (Admin)
router.get('/users', authAdmin, getUsers);

// @route   POST api/admin/users
// @desc    Crear un nuevo usuario
// @access  Private (Admin)
router.post('/users', authAdmin, createUser);

// @route   PUT api/admin/users/:id
// @desc    Actualizar un usuario
// @access  Private (Admin)
router.put('/users/:id', authAdmin, updateUser);

// @route   DELETE api/admin/users/:id
// @desc    Eliminar un usuario
// @access  Private (Admin)
router.delete('/users/:id', authAdmin, deleteUser);

// --- Gestión de Rutas ---

// @route   GET api/admin/routes
// @desc    Obtener todas las rutas
// @access  Private (Admin)
router.get('/routes', authAdmin, getRoutes);

router.post('/routes', authAdmin, createRoute);

// @route   PUT api/admin/routes/:id
// @desc    Actualizar una ruta
// @access  Private (Admin)
router.put('/routes/:id', authAdmin, updateRoute);

// @route   DELETE api/admin/routes/:id
// @desc    Eliminar una ruta
// @access  Private (Admin)
router.delete('/routes/:id', authAdmin, deleteRoute);

// --- Gestión de Comercios ---

// @route   GET api/admin/stores
// @desc    Obtener todos los comercios
// @access  Private (Admin)
router.get('/stores', authAdmin, getStores);

router.post('/stores', authAdmin, createStore);

// @route   PUT api/admin/stores/:id
// @desc    Actualizar un comercio
// @access  Private (Admin)
router.put('/stores/:id', authAdmin, updateStore);

// @route   DELETE api/admin/stores/:id
// @desc    Eliminar un comercio
// @access  Private (Admin)
router.delete('/stores/:id', authAdmin, deleteStore);

// --- Gestión de Transacciones ---

// @route   GET api/admin/transactions
// @desc    Obtener todas las transacciones
// @access  Private (Admin)
router.get('/transactions', authAdmin, getTransactions);

module.exports = router;
