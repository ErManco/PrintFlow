const express = require("express");
const cors = require("cors");

require("dotenv").config();

const db = require("./config/db");

const productosRoutes =
  require("./routes/productosRoutes");

const authRoutes =
  require("./routes/authRoutes");

const categoriasRoutes =
  require("./routes/categoriasRoutes");

const app = express();

app.use(cors());

app.use(
  express.json({
    limit: "10mb",
  })
);

// PRODUCTOS
app.use(
  "/api/productos",
  productosRoutes
);

// LOGIN Y REGISTRO
app.use(
  "/api/auth",
  authRoutes
);

// CATEGORÍAS
app.use(
  "/api/categorias",
  categoriasRoutes
);

// PRUEBA DEL BACKEND
app.get("/", (req, res) => {
  res.send(
    "Backend de PrintFlow funcionando"
  );
});

// PRUEBA DE MYSQL
app.get(
  "/api/prueba-db",
  async (req, res) => {
    try {
      const [resultado] =
        await db.query(
          "SELECT 1 AS conexion"
        );

      res.json({
        mensaje:
          "Conexión con MySQL correcta",
        resultado,
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        mensaje:
          "Error al conectar con MySQL",
        error: error.message,
      });
    }
  }
);

const PORT =
  process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(
    `Servidor PrintFlow ejecutándose en http://localhost:${PORT}`
  );
});