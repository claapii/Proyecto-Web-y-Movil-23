const express = require("express");
const pool = require("../config/db");

const router = express.Router();

/* =========================================
   REGISTER
========================================= */
router.post("/register", async (req, res) => {
  try {

    const {
      nombre,
      apellido,
      correo,
      rut,
      password
    } = req.body;

    // Validación básica
    if (!nombre || !apellido || !correo || !rut || !password) {
      return res.status(400).json({
        success: false,
        message: "Todos los campos son obligatorios"
      });
    }

    // Verificar si usuario ya existe
    const usuarioExiste = await pool.query(
      "SELECT * FROM usuarios WHERE correo = $1",
      [correo]
    );

    if (usuarioExiste.rows.length > 0) {
      return res.status(409).json({
        success: false,
        message: "El usuario ya existe"
      });
    }

    // Insertar usuario
    const result = await pool.query(
      `INSERT INTO usuarios
      (nombre, apellido, correo, rut, password)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *`,
      [nombre, apellido, correo, rut, password]
    );

    res.status(201).json({
      success: true,
      message: "Usuario registrado correctamente",
      data: result.rows[0]
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Error al registrar usuario",
      error: error.message
    });

  }
});

/* =========================================
   LOGIN
========================================= */
router.post("/login", async (req, res) => {
  try {

    const { correo, password } = req.body;

    // Validación básica
    if (!correo || !password) {
      return res.status(400).json({
        success: false,
        message: "Correo y contraseña son obligatorios"
      });
    }

    // Buscar usuario
    const result = await pool.query(
      "SELECT * FROM usuarios WHERE correo = $1",
      [correo]
    );

    // Usuario no existe
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Usuario no encontrado"
      });
    }

    const usuario = result.rows[0];

    // Validar contraseña
    if (usuario.password !== password) {
      return res.status(401).json({
        success: false,
        message: "Contraseña incorrecta"
      });
    }

    // Login exitoso
    res.status(200).json({
      success: true,
      message: "Inicio de sesión exitoso",
      data: usuario
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Error al iniciar sesión",
      error: error.message
    });

  }
});

module.exports = router;