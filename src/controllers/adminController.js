const User = require('../models/User');
const Route = require('../models/Route');
const Store = require('../models/Store');
const Transaction = require('../models/Transaction');
const sequelize = require('../config/database');

exports.getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.count();
    const totalRoutes = await Route.count({
      where: { estado: 'aprobada' },
    });
    const activeStores = await Store.count({
      where: { estado: 'activo' },
    });

    const totalSales = await Transaction.sum('monto');

    res.json({
      totalUsers,
      totalRoutes,
      activeStores,
      totalSales: totalSales || 0, // Devuelve 0 si no hay ventas
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Error en el servidor');
  }
};
