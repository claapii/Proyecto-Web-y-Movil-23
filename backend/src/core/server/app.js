const express = require("express");
const cors = require("cors");
const pool = require("../config/db");
const oficinasRoutes = require("../../features/oficinas/oficinasRoutes");
const tramitesRoutes = require("../../features/tramites/tramitesRoutes");
const horariosRoutes = require("../../features/horarios/horariosRoutes");
const authRoutes = require("../../features/auth/authRoutes");
const reservasRoutes = require("../../features/reservas/reservasRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/oficinas", oficinasRoutes);
app.use("/api/tramites", tramitesRoutes);
app.use("/api/horarios", horariosRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/reservas", reservasRoutes);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Servidor backend funcionando correctamente"
  });
});

app.get("/api/test-db", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");

    res.json({
      success: true,
      message: "Conexión a PostgreSQL funcionando correctamente",
      data: result.rows[0]
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al conectar con PostgreSQL",
      error: error.message
    });
  }
});

module.exports = app;