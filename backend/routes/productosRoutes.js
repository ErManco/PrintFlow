const express = require("express");

const {
  obtenerProductos,
  obtenerProductoPorId,
} = require("../controllers/productoController");

const router = express.Router();

router.get("/", obtenerProductos);
router.get("/:id", obtenerProductoPorId);

module.exports = router;