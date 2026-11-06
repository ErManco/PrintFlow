const db = require("../config/db");

const Producto = {
  obtenerTodos: async () => {
    const [rows] = await db.query(
      "SELECT * FROM productos ORDER BY id_producto ASC"
    );

    return rows;
  },

  obtenerPorId: async (id) => {
    const [rows] = await db.query(
      "SELECT * FROM productos WHERE id_producto = ?",
      [id]
    );

    return rows[0];
  },

  crear: async (producto) => {
    const {
      titulo,
      descripcion,
      categoria,
      imagen,
      colores,
      precio,
    } = producto;

    const coloresJSON = JSON.stringify(colores || {});

    const [resultado] = await db.query(
      `INSERT INTO productos
        (titulo, descripcion, categoria, imagen, colores, precio)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        titulo,
        descripcion,
        categoria,
        imagen,
        coloresJSON,
        precio,
      ]
    );

    return resultado.insertId;
  },
};

module.exports = Producto;