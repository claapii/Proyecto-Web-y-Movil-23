const verificarAdmin = (req, res, next) => {
  if (req.usuario.rol !== 'admin') {
    return res.status(403).json({
      success: false,
      message: "Acceso denegado: se requiere rol de administrador"
    });
  }
  next();
};

const verificarFuncionario = (req, res, next) => {
  if (req.usuario.rol !== 'funcionario' && req.usuario.rol !== 'admin') {
    return res.status(403).json({
      success: false,
      message: "Acceso denegado: se requiere rol de funcionario"
    });
  }
  next();
};

module.exports = { verificarAdmin, verificarFuncionario };