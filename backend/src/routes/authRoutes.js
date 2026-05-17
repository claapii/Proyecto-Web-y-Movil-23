const express = require("express");
const pool = require("../config/db");

const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      `INSERT INTO usuarios
      (nombre, apellido, correo, rut, password)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *`,
      [nombre, apellido, correo, rut, hashedPassword]
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
    const passwordValida = await bcrypt.compare(
      password,
      usuario.password
    );

    if (!passwordValida) {
      return res.status(401).json({
        success: false,
        message: "Contraseña incorrecta"
      });
    }

    //Token JWT
    const token = jwt.sign(
      {
        id: usuario.id_usuario,
        correo: usuario.correo
      },
      "clave_secreta",
      { expiresIn: "2h" }
    );

    //Login exitoso
    res.status(200).json({
      success: true,
      message: "Login exitoso",
      token,
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

/* =========================================
   CLAVE ÚNICA
========================================= */
router.post("/claveunica", async (req, res) => {

  try {
    console.log(req.body);
    const { rut, password } = req.body;

    const result = await pool.query(
      "SELECT * FROM usuarios WHERE rut = $1",
      [rut]
    );

    console.log(result.rows);
    
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Usuario no encontrado"
      });
    }

    const usuario = result.rows[0];

    const passwordValida = await bcrypt.compare(
      password,
      usuario.password
    );

    if (!passwordValida) {
      return res.status(401).json({
        success: false,
        message: "Contraseña incorrecta"
      });
    }

    const token = jwt.sign(
      {
        id: usuario.id_usuario,
        rut: usuario.rut
      },
      "clave_secreta",
      { expiresIn: "2h" }
    );

    res.status(200).json({
      success: true,
      message: "Login ClaveÚnica exitoso",
      token,
      data: usuario
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Error en ClaveÚnica",
      error: error.message
    });
  }
});


module.exports = router;