const Producto = require("../models/Producto");

const obtenerProductos = async (req, res) => {
  try {
    const productos = await Producto.obtenerTodos();

    res.json(productos);
  } catch (error) {
    console.error("ERROR OBTENER PRODUCTOS:", error);

    res.status(500).json({
      mensaje: "Error al obtener los productos",
      error: error.message,
    });
  }
};

const obtenerProductoPorId = async (req, res) => {
  try {
    const producto = await Producto.obtenerPorId(
      req.params.id
    );

    if (!producto) {
      return res.status(404).json({
        mensaje: "Producto no encontrado",
      });
    }

    res.json(producto);
  } catch (error) {
    console.error("ERROR OBTENER PRODUCTO:", error);

    res.status(500).json({
      mensaje: "Error al obtener el producto",
      error: error.message,
    });
  }
};

const crearProducto = async (req, res) => {
  try {
    console.log("Producto recibido:");
    console.log({
      titulo: req.body.titulo,
      descripcion: req.body.descripcion,
      categoria: req.body.categoria,
      precio: req.body.precio,
      tieneImagen: Boolean(req.body.imagen),
      colores: Object.keys(req.body.colores || {}),
    });

    const {
      titulo,
      descripcion,
      categoria,
      imagen,
      precio,
    } = req.body;

    if (
      !titulo ||
      !descripcion ||
      !categoria ||
      !imagen ||
      precio === undefined ||
      precio === null ||
      precio === ""
    ) {
      return res.status(400).json({
        mensaje: "Faltan datos obligatorios del producto",
      });
    }

    const nuevoId = await Producto.crear(req.body);

    const productoCreado =
      await Producto.obtenerPorId(nuevoId);

    res.status(201).json(productoCreado);
  } catch (error) {
    console.error("ERROR AL CREAR PRODUCTO:");
    console.error(error);

    res.status(500).json({
      mensaje: "Error al guardar el producto",
      error: error.message,
      codigo: error.code || null,
      sqlMessage: error.sqlMessage || null,
    });
  }
};

module.exports = {
  obtenerProductos,
  obtenerProductoPorId,
  crearProducto,
};