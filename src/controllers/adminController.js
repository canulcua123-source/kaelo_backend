const User = require('../models/User');
const Route = require('../models/Route');
const Store = require('../models/Store');
const Transaction = require('../models/Transaction');
const sequelize = require('../config/database');
const bcrypt = require('bcryptjs');

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

// --- Gestión de Usuarios ---

exports.getUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ['password'] }, // Excluimos el password
    });
    res.json(users);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Error en el servidor');
  }
};

exports.createUser = async (req, res) => {
  const { nombre, email, password, rol } = req.body;

  try {
    let user = await User.findOne({ where: { email } });
    if (user) {
      return res.status(400).json({ msg: 'El usuario ya existe' });
    }

    const allowedRoles = User.getAttributes().rol.values;
    if (!rol || !allowedRoles.includes(rol)) {
      return res.status(400).json({ msg: `El rol '${rol}' no es válido.` });
    }

    user = User.build({ nombre, email, password, rol });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    res.json({ msg: 'Usuario creado exitosamente' });

  } catch (error) {
    console.error(error.message);
    res.status(500).send('Error en el servidor');
  }
};

exports.updateUser = async (req, res) => {
  const { nombre, email, rol } = req.body;
  const { id } = req.params;

  try {
    let user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ msg: 'Usuario no encontrado' });
    }

    user.nombre = nombre || user.nombre;
    user.email = email || user.email;
    user.rol = rol || user.rol;

    await user.save();

    res.json({ msg: 'Usuario actualizado exitosamente' });

  } catch (error) {
    console.error(error.message);
    res.status(500).send('Error en el servidor');
  }
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    let user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ msg: 'Usuario no encontrado' });
    }

    await user.destroy();

    res.json({ msg: 'Usuario eliminado exitosamente' });

  } catch (error) {
    console.error(error.message);
    res.status(500).send('Error en el servidor');
  }
};

// --- Gestión de Rutas ---

exports.getRoutes = async (req, res) => {
  try {
    const routes = await Route.findAll({
      include: {
        model: User,
        as: 'creador',
        attributes: ['nombre'],
      },
    });
    res.json(routes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Error en el servidor');
  }
};

exports.updateRouteStatus = async (req, res) => {
  const { id } = req.params;
  const { estado } = req.body;

  try {
    const route = await Route.findByPk(id);
    if (!route) {
      return res.status(404).json({ msg: 'Ruta no encontrada' });
    }

    const allowedStatus = Route.getAttributes().estado.values;
    if (!estado || !allowedStatus.includes(estado)) {
      return res.status(400).json({ msg: `El estado '${estado}' no es válido.` });
    }

    route.estado = estado;
    await route.save();

    res.json({ msg: `Ruta ${estado} exitosamente` });

  } catch (error) {
    console.error(error.message);
    res.status(500).send('Error en el servidor');
  }
};

exports.deleteRoute = async (req, res) => {
  const { id } = req.params;

  try {
    const route = await Route.findByPk(id);
    if (!route) {
      return res.status(404).json({ msg: 'Ruta no encontrada' });
    }

    await route.destroy();

    res.json({ msg: 'Ruta eliminada exitosamente' });

  } catch (error) {
    console.error(error.message);
    res.status(500).send('Error en el servidor');
  }
};

// --- Gestión de Comercios ---

exports.getStores = async (req, res) => {
  try {
    const stores = await Store.findAll({
      include: {
        model: User,
        as: 'propietario',
        attributes: ['nombre'],
      },
    });
    res.json(stores);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Error en el servidor');
  }
};

exports.updateStoreStatus = async (req, res) => {
  const { id } = req.params;
  const { estado } = req.body;

  try {
    const store = await Store.findByPk(id);
    if (!store) {
      return res.status(404).json({ msg: 'Comercio no encontrado' });
    }

    const allowedStatus = Store.getAttributes().estado.values;
    if (!estado || !allowedStatus.includes(estado)) {
      return res.status(400).json({ msg: `El estado '${estado}' no es válido.` });
    }

    store.estado = estado;
    await store.save();

    res.json({ msg: `Comercio ${estado} exitosamente` });

  } catch (error) {
    console.error(error.message);
    res.status(500).send('Error en el servidor');
  }
};

// --- Gestión de Transacciones ---

exports.getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.findAll({
      include: [
        {
          model: User,
          as: 'usuario',
          attributes: ['nombre', 'email'],
        },
        {
          model: Route,
          as: 'ruta',
          attributes: ['nombre'],
        },
      ],
    });
    res.json(transactions);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Error en el servidor');
  }
};
