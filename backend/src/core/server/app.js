const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const pool = require("../config/db");
const oficinasRoutes = require("../../features/oficinas/oficinasRoutes");
const tramitesRoutes = require("../../features/tramites/tramitesRoutes");
const horariosRoutes = require("../../features/horarios/horariosRoutes");
const authRoutes = require("../../features/auth/authRoutes");
const reservasRoutes = require("../../features/reservas/reservasRoutes");

const app = express();

// Helmet - protección contra XSS y otros ataques HTTP
app.use(helmet());

// CORS restrictivo - solo permite el frontend
app.use(cors({
  origin: ["http://localhost:8100", "http://localhost:3000"],
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// Límite de tamaño de body
app.use(express.json({ limit: "10kb" }));

// Rate limiting general - 100 peticiones por 15 minutos
const limiterGeneral = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    success: false,
    message: "Demasiadas peticiones, intenta más tarde"
  }
});

// Rate limiting estricto para auth - 10 intentos por 15 minutos
const limiterAuth = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: {
    success: false,
    message: "Demasiados intentos de autenticación, intenta más tarde"
  }
});

app.use(limiterGeneral);
app.use("/api/auth", limiterAuth);

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