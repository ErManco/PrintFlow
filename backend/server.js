const express = require("express");
const cors = require("cors");
require("dotenv").config();

const db = require("./config/db");
const productosRoutes = require("./routes/productosRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/productos", productosRoutes);

app.get("/", (req, res) => {
  res.send("Backend de PrintFlow funcionando");
});

app.get("/api/prueba-db", async (req, res) => {
  try {
    const [resultado] = await db.query("SELECT 1 AS conexion");

    res.json({
      mensaje: "Conexión con MySQL correcta",
      resultado,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      mensaje: "Error al conectar con MySQL",
      error: error.message,
    });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor PrintFlow ejecutándose en http://localhost:${PORT}`);
});