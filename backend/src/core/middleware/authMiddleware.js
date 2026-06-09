const jwt = require("jsonwebtoken");

const verificarToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // Validar que venga el header Authorization
    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "Token no proporcionado"
      });
    }

    // Formato esperado: Bearer token
    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token inválido"
      });
    }

    // Validar token JWT
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    // Guardar datos del usuario en la request
    req.usuario = decoded;

    next();

  } catch (error) {
    return res.status(403).json({
      success: false,
      message: "Token inválido o expirado"
    });
  }
};

module.exports = verificarToken;