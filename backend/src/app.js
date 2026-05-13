const express = require("express");
const cors = require("cors");
const pool = require("./config/db");
const oficinasRoutes = require("./routes/oficinasRoutes");
const tramitesRoutes = require("./routes/tramitesRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/oficinas", oficinasRoutes);
app.use("/api/tramites", tramitesRoutes);

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