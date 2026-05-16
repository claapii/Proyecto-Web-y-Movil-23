const express = require("express");
const pool = require("../config/db");

const router = express.Router();

/* =========================================
   CREAR RESERVA
========================================= */
router.post("/", async (req, res) => {
  try {

    const {
      id_usuario,
      id_tramite,
      fecha,
      hora
    } = req.body;

    if (!id_usuario || !id_tramite || !fecha || !hora) {
      return res.status(400).json({
        success: false,
        message: "Todos los campos son obligatorios"
      });
    }

    const result = await pool.query(
      `INSERT INTO reservas
      (id_usuario, id_tramite, fecha, hora)
      VALUES ($1, $2, $3, $4)
      RETURNING *`,
      [id_usuario, id_tramite, fecha, hora]
    );

    res.status(201).json({
      success: true,
      message: "Reserva creada correctamente",
      data: result.rows[0]
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Error al crear reserva",
      error: error.message
    });

  }
});

/* =========================================
   OBTENER RESERVAS DE USUARIO
========================================= */
router.get("/:id_usuario", async (req, res) => {
  try {

    const { id_usuario } = req.params;

    const result = await pool.query(
      `SELECT * FROM reservas
       WHERE id_usuario = $1
       ORDER BY id_reserva ASC`,
      [id_usuario]
    );

    res.status(200).json({
      success: true,
      data: result.rows
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Error al obtener reservas",
      error: error.message
    });

  }
});

/* =========================================
   ELIMINAR RESERVA
========================================= */
router.delete("/:id", async (req, res) => {
  try {

    const { id } = req.params;

    const result = await pool.query(
      `DELETE FROM reservas
       WHERE id_reserva = $1
       RETURNING *`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Reserva no encontrada"
      });
    }

    res.status(200).json({
      success: true,
      message: "Reserva eliminada correctamente",
      data: result.rows[0]
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Error al eliminar reserva",
      error: error.message
    });

  }
});

module.exports = router;