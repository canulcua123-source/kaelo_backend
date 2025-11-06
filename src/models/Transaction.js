const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');
const Route = require('./Route');

const Transaction = sequelize.define('Transaction', {
  monto: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  tipo: {
    type: DataTypes.ENUM('compra_ruta', 'pedido_comercio'),
    allowNull: false,
  },
  // El usuario que realiza la transacción
  usuarioId: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id',
    },
  },
  // La ruta asociada (si es una compra de ruta)
  rutaId: {
    type: DataTypes.INTEGER,
    references: {
      model: Route,
      key: 'id',
    },
    allowNull: true, // Puede ser nulo si es un pedido a comercio
  },
  // Podríamos añadir una referencia a un Pedido si tuviéramos ese modelo
});

Transaction.belongsTo(User, { as: 'usuario', foreignKey: 'usuarioId' });
Transaction.belongsTo(Route, { as: 'ruta', foreignKey: 'rutaId' });

module.exports = Transaction;
