const express = require("express");

const {
  obtenerProductos,
  obtenerProductoPorId,
  crearProducto,
} = require("../controllers/productoController");

const router = express.Router();

router.get("/", obtenerProductos);

router.get("/:id", obtenerProductoPorId);

router.post("/", crearProducto);

module.exports = router;