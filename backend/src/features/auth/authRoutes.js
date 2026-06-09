const express = require("express");
const pool = require("../../core/config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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

    // Validación básica de correo
    const correoRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!correoRegex.test(correo)) {
      return res.status(400).json({
        success: false,
        message: "Correo electrónico inválido"
      });
    }

    // Validación básica de contraseña
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "La contraseña debe tener al menos 6 caracteres"
      });
    }

    //Validación de rut chileno
    const rutRegex = /^\d{1,2}\.\d{3}\.\d{3}[-][0-9kK]$/;
    if (!rutRegex.test(rut)) {
      return res.status(400).json({
        success: false,
        message: "RUT inválido, debe tener el formato 12.345.678-9"
      });
    }

    //Validación de nombre y apellido
    if (nombre.length < 2 || apellido.length < 2) {
      return res.status(400).json({
        success: false,
        message: "El nombre y apellido deben tener al menos 2 caracteres"
      });
    }

    // Verificar si usuario ya existe por correo o RUT
    const usuarioExiste = await pool.query(
      "SELECT id_usuario FROM usuarios WHERE correo = $1 OR rut = $2",
      [correo, rut]
    );

    if (usuarioExiste.rows.length > 0) {
      return res.status(409).json({
        success: false,
        message: "El correo o RUT ya se encuentra registrado"
      });
    }

    // Encriptar contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insertar usuario
    const result = await pool.query(
      `INSERT INTO usuarios
      (nombre, apellido, correo, rut, password_hash, rol)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING id_usuario, nombre, apellido, correo, rut, rol`,
      [nombre, apellido, correo, rut, hashedPassword, "usuario"]
    );

    res.status(201).json({
      success: true,
      message: "Usuario registrado correctamente",
      data: result.rows[0]
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al registrar usuario"
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
      return res.status(401).json({
        success: false,
        message: "Credenciales inválidas"
      });
    }

    const usuario = result.rows[0];

    // Validar contraseña
    const passwordValida = await bcrypt.compare(
      password,
      usuario.password_hash
    );

    if (!passwordValida) {
      return res.status(401).json({
        success: false,
        message: "Credenciales inválidas"
      });
    }

    // Generar token JWT
    const token = jwt.sign(
      {
        id: usuario.id_usuario,
        correo: usuario.correo,
        rol: usuario.rol || "usuario"
      },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    // Login exitoso
    res.status(200).json({
      success: true,
      message: "Login exitoso",
      token,
      data: {
        id_usuario: usuario.id_usuario,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        correo: usuario.correo,
        rut: usuario.rut,
        rol: usuario.rol || "usuario"
      }
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al iniciar sesión"
    });
  }
});

/* =========================================
   CLAVE ÚNICA
========================================= */
router.post("/claveunica", async (req, res) => {
  try {
    const { rut, password } = req.body;

    // Validación básica
    if (!rut || !password) {
      return res.status(400).json({
        success: false,
        message: "RUT y contraseña son obligatorios"
      });
    }

    // Buscar usuario por RUT
    const result = await pool.query(
      "SELECT * FROM usuarios WHERE rut = $1",
      [rut]
    );

    // Usuario no existe
    if (result.rows.length === 0) {
      return res.status(401).json({
        success: false,
        message: "Credenciales inválidas"
      });
    }

    const usuario = result.rows[0];

    // Validar contraseña
    const passwordValida = await bcrypt.compare(
      password,
      usuario.password_hash
    );

    if (!passwordValida) {
      return res.status(401).json({
        success: false,
        message: "Credenciales inválidas"
      });
    }

    // Generar token JWT
    const token = jwt.sign(
      {
        id: usuario.id_usuario,
        rut: usuario.rut,
        rol: usuario.rol || "usuario"
      },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    // Login ClaveÚnica exitoso
    res.status(200).json({
      success: true,
      message: "Login ClaveÚnica exitoso",
      token,
      data: {
        id_usuario: usuario.id_usuario,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        correo: usuario.correo,
        rut: usuario.rut,
        rol: usuario.rol || "usuario"
      }
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error en ClaveÚnica"
    });
  }
});

module.exports = router;