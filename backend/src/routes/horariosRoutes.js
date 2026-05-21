const express = require("express");
const pool = require("../config/db");

const router = express.Router();


console.log("HorariosRoutes cargado");
/* GET horarios por trámite */
router.get("/:id_tramite", async (req, res) => {

  try {

    const { id_tramite } = req.params;

    const result = await pool.query(
      `SELECT * FROM horarios
       WHERE id_tramite = $1
       ORDER BY fecha, hora`,
      [id_tramite]
    );

    res.status(200).json({
      success: true,
      data: result.rows
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error al obtener horarios",
      error: error.message
    });
  }
});

/* PUT reservar horario */
router.put("/:id_horario", async (req, res) => {

  try {

    const { id_horario } = req.params;

    const result = await pool.query(
      `UPDATE horarios
       SET disponible = false
       WHERE id_horario = $1
       RETURNING *`,
      [id_horario]
    );

    if (result.rows.length === 0) {

      return res.status(404).json({
        success: false,
        message: "Horario no encontrado"
      });
    }

    res.status(200).json({
      success: true,
      message: "Horario reservado",
      data: result.rows[0]
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Error al reservar horario"
    });
  }
});

module.exports = router;