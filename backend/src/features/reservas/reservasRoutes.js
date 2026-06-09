const express = require("express");
const pool = require("../../core/config/db");
const verificarToken = require("../../core/middleware/authMiddleware");

const router = express.Router();

/* =========================================
   CREAR RESERVA
========================================= */
router.post("/", verificarToken, async (req, res) => {

  const client = await pool.connect();

  try {

    const id_usuario = req.usuario.id;

    const {
      id_tramite,
      id_horario
    } = req.body;

    if (!id_usuario || !id_tramite || !id_horario) {

      return res.status(400).json({
        success: false,
        message:
          "id_tramite e id_horario son obligatorios"
      });
    }

    /* =========================
       INICIAR TRANSACCIÓN
    ========================= */

    await client.query("BEGIN");

    /* =========================
       VALIDAR RESERVA DUPLICADA
    ========================= */

    const reservaExistente =
      await client.query(

        `SELECT *
         FROM reservas
         WHERE id_usuario = $1
           AND id_tramite = $2
           AND estado = 'pendiente'`,

        [id_usuario, id_tramite]
      );

    if (reservaExistente.rows.length > 0) {

      await client.query("ROLLBACK");

      return res.status(409).json({
        success: false,
        message:
          "Ya tienes una reserva activa para este trámite"
      });
    }

    /* =========================
       VALIDAR HORARIO
    ========================= */

    const horarioResult =
      await client.query(

        `SELECT *
         FROM horarios
         WHERE id_horario = $1
           AND id_tramite = $2
         FOR UPDATE`,

        [id_horario, id_tramite]
      );

    if (horarioResult.rows.length === 0) {

      await client.query("ROLLBACK");

      return res.status(404).json({
        success: false,
        message:
          "Horario no encontrado"
      });
    }

    const horario =
      horarioResult.rows[0];

    if (!horario.disponible) {

      await client.query("ROLLBACK");

      return res.status(409).json({
        success: false,
        message:
          "El horario ya no está disponible"
      });
    }

    /* =========================
       INSERT RESERVA
    ========================= */

    const reservaResult =
      await client.query(

        `INSERT INTO reservas
         (
           id_usuario,
           id_tramite,
           id_horario,
           estado
         )
         VALUES ($1, $2, $3, $4)
         RETURNING *`,

        [
          id_usuario,
          id_tramite,
          id_horario,
          "pendiente"
        ]
      );

    /* =========================
       BLOQUEAR HORARIO
    ========================= */

    await client.query(

      `UPDATE horarios
       SET disponible = false
       WHERE id_horario = $1`,

      [id_horario]
    );

    /* =========================
       CONFIRMAR
    ========================= */

    await client.query("COMMIT");

    res.status(201).json({

      success: true,

      message:
        "Reserva creada correctamente",

      data:
        reservaResult.rows[0]
    });

  } catch (error) {

    await client.query("ROLLBACK");

    console.error(error);

    res.status(500).json({

      success: false,

      message:
        "Error al crear reserva",

      error:
        error.message
    });

  } finally {

    client.release();
  }
});

/* =========================================
   OBTENER RESERVAS DE USUARIO
========================================= */
router.get("/:id_usuario", verificarToken, async (req, res) => {
  try {
    const { id_usuario } = req.params;

    const result = await pool.query(
      `SELECT 
          r.id_reserva,
          r.id_usuario,
          r.id_tramite,
          r.id_horario,
          r.estado,
          r.creado_en,
          t.titulo AS tramite,
          h.fecha,
          h.hora
       FROM reservas r
       JOIN tramites t ON r.id_tramite = t.id_tramite
       JOIN horarios h ON r.id_horario = h.id_horario
       WHERE r.id_usuario = $1
       ORDER BY r.id_reserva ASC`,
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
   DETALLE RESERVA
========================================= */
router.get("/detalle/:id", verificarToken, async (req, res) => {

  try {

    const { id } = req.params;

    const result = await pool.query(
      `SELECT

          r.id_reserva,
          r.estado,

          h.fecha,
          h.hora,

          t.titulo,

          u.nombre,
          u.apellido,
          u.correo,
          u.rut

       FROM reservas r

       JOIN horarios h
         ON r.id_horario = h.id_horario

       JOIN tramites t
         ON r.id_tramite = t.id_tramite

       JOIN usuarios u
         ON r.id_usuario = u.id_usuario

       WHERE r.id_reserva = $1`,
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
      data: result.rows[0]
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Error al obtener detalle reserva",
      error: error.message
    });
  }
});

/* =========================================
   ELIMINAR RESERVA
========================================= */
router.delete("/:id", verificarToken, async (req, res) => {
  const client = await pool.connect();

  try {
    const { id } = req.params;

    // Iniciar transacción
    await client.query("BEGIN");

    // Buscar y eliminar reserva
    const reservaResult = await client.query(
      `DELETE FROM reservas
       WHERE id_reserva = $1
       RETURNING *`,
      [id]
    );

    // Reserva no encontrada
    if (reservaResult.rows.length === 0) {
      await client.query("ROLLBACK");

      return res.status(404).json({
        success: false,
        message: "Reserva no encontrada"
      });
    }

    const reservaEliminada = reservaResult.rows[0];

    // Liberar horario asociado a la reserva
    await client.query(
      `UPDATE horarios
       SET disponible = true
       WHERE id_horario = $1`,
      [reservaEliminada.id_horario]
    );

    // Confirmar transacción
    await client.query("COMMIT");

    res.status(200).json({
      success: true,
      message: "Reserva eliminada correctamente",
      data: reservaEliminada
    });

  } catch (error) {
    await client.query("ROLLBACK");

    res.status(500).json({
      success: false,
      message: "Error al eliminar reserva",
      error: error.message
    });

  } finally {
    client.release();
  }
});

module.exports = router;