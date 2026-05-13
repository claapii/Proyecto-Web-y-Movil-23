const express = require("express");
const pool = require("../config/db");

const router = express.Router();

/* GET - Obtener todas las oficinas */
router.get("/", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM oficinas ORDER BY id_oficina ASC"
    );

    res.status(200).json({
      success: true,
      message: "Oficinas obtenidas correctamente",
      data: result.rows
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al obtener oficinas",
      error: error.message
    });
  }
});

/* GET - Obtener una oficina por ID */
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "SELECT * FROM oficinas WHERE id_oficina = $1",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Oficina no encontrada"
      });
    }

    res.status(200).json({
      success: true,
      message: "Oficina obtenida correctamente",
      data: result.rows[0]
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al obtener oficina",
      error: error.message
    });
  }
});

/* POST - Crear una nueva oficina */
router.post("/", async (req, res) => {
  try {
    const { nombre, direccion, horario, telefono } = req.body;

    if (!nombre || !direccion || !horario) {
      return res.status(400).json({
        success: false,
        message: "Nombre, dirección y horario son obligatorios"
      });
    }

    const result = await pool.query(
      `INSERT INTO oficinas (nombre, direccion, horario, telefono)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [nombre, direccion, horario, telefono]
    );

    res.status(201).json({
      success: true,
      message: "Oficina creada correctamente",
      data: result.rows[0]
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al crear oficina",
      error: error.message
    });
  }
});

/* PUT - Actualizar una oficina */
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, direccion, horario, telefono } = req.body;

    if (!nombre || !direccion || !horario) {
      return res.status(400).json({
        success: false,
        message: "Nombre, dirección y horario son obligatorios"
      });
    }

    const result = await pool.query(
      `UPDATE oficinas
       SET nombre = $1,
           direccion = $2,
           horario = $3,
           telefono = $4
       WHERE id_oficina = $5
       RETURNING *`,
      [nombre, direccion, horario, telefono, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Oficina no encontrada"
      });
    }

    res.status(200).json({
      success: true,
      message: "Oficina actualizada correctamente",
      data: result.rows[0]
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al actualizar oficina",
      error: error.message
    });
  }
});

/* DELETE - Eliminar una oficina */
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "DELETE FROM oficinas WHERE id_oficina = $1 RETURNING *",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Oficina no encontrada"
      });
    }

    res.status(200).json({
      success: true,
      message: "Oficina eliminada correctamente",
      data: result.rows[0]
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al eliminar oficina",
      error: error.message
    });
  }
});

module.exports = router;