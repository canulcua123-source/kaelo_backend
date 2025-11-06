const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');

const Route = sequelize.define('Route', {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  distancia: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  dificultad: {
    type: DataTypes.ENUM('Fácil', 'Intermedia', 'Difícil'),
    allowNull: false,
  },
  precio: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  // El creador de la ruta
  creadorId: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id',
    },
  },
  estado: {
    type: DataTypes.ENUM('pendiente', 'aprobada', 'rechazada'),
    defaultValue: 'pendiente',
    allowNull: false,
  },
});

Route.belongsTo(User, { as: 'creador', foreignKey: 'creadorId' });

module.exports = Route;
