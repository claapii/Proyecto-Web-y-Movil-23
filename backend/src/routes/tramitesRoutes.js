const express = require("express");
const pool = require("../config/db");

const router = express.Router();

/* GET - Obtener todos los trámites */
router.get("/", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM tramites ORDER BY id_tramite ASC"
    );

    res.status(200).json({
      success: true,
      message: "Trámites obtenidos correctamente",
      data: result.rows
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al obtener trámites",
      error: error.message
    });
  }
});

/* GET - Obtener un trámite por ID */
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "SELECT * FROM tramites WHERE id_tramite = $1",
      [id]
    );

    const requisitos = await pool.query(
      `SELECT icono, texto
      FROM requisitos
      WHERE id_tramite = $1`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Trámite no encontrado"
      });
    }

    res.status(200).json({
      success: true,
      message: "Trámite obtenido correctamente",
      data: {
        ...result.rows[0],
        requisitos: requisitos.rows
      }
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al obtener trámite",
      error: error.message
    });
  }
});

/* POST - Crear un nuevo trámite */
router.post("/", async (req, res) => {
  try {
    const { titulo, descripcion, duracion, modalidad, ubicacion } = req.body;

    if (!titulo || !descripcion) {
      return res.status(400).json({
        success: false,
        message: "Título y descripción son obligatorios"
      });
    }

    const result = await pool.query(
      `INSERT INTO tramites (titulo, descripcion, duracion, modalidad, ubicacion)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [titulo, descripcion, duracion, modalidad, ubicacion]
    );

    res.status(201).json({
      success: true,
      message: "Trámite creado correctamente",
      data: result.rows[0]
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al crear trámite",
      error: error.message
    });
  }
});

/* PUT - Actualizar un trámite */
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { titulo, descripcion, duracion, modalidad, ubicacion } = req.body;

    if (!titulo || !descripcion) {
      return res.status(400).json({
        success: false,
        message: "Título y descripción son obligatorios"
      });
    }

    const result = await pool.query(
      `UPDATE tramites
       SET titulo = $1,
           descripcion = $2,
           duracion = $3,
           modalidad = $4,
           ubicacion = $5
       WHERE id_tramite = $6
       RETURNING *`,
      [titulo, descripcion, duracion, modalidad, ubicacion, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Trámite no encontrado"
      });
    }

    res.status(200).json({
      success: true,
      message: "Trámite actualizado correctamente",
      data: result.rows[0]
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al actualizar trámite",
      error: error.message
    });
  }
});

/* DELETE - Eliminar un trámite */
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "DELETE FROM tramites WHERE id_tramite = $1 RETURNING *",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Trámite no encontrado"
      });
    }

    res.status(200).json({
      success: true,
      message: "Trámite eliminado correctamente",
      data: result.rows[0]
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al eliminar trámite",
      error: error.message
    });
  }
});

module.exports = router;