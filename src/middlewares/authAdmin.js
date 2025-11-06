const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = function (req, res, next) {
  // Obtener token del header
  const token = req.header('x-auth-token');

  // Verificar si no hay token
  if (!token) {
    return res.status(401).json({ msg: 'No hay token, permiso no válido' });
  }

  // Validar token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;

    // Verificar si el usuario es Admin
    if (req.user.rol !== 'Admin') {
      return res.status(403).json({ msg: 'Acceso denegado: no eres administrador' });
    }

    next();
  } catch (error) {
    res.status(401).json({ msg: 'Token no es válido' });
  }
};
