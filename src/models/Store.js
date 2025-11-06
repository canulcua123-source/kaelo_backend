const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');

const Store = sequelize.define('Store', {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  descripcion: {
    type: DataTypes.TEXT,
  },
  ubicacion: {
    type: DataTypes.STRING, // Podría ser un JSON con latitud y longitud
    allowNull: false,
  },
  // El propietario del comercio
  propietarioId: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id',
    },
  },
  estado: {
    type: DataTypes.ENUM('activo', 'inactivo', 'pendiente'),
    defaultValue: 'pendiente',
    allowNull: false,
  },
});

Store.belongsTo(User, { as: 'propietario', foreignKey: 'propietarioId' });

module.exports = Store;
