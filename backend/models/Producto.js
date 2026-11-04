const db = require("../config/db");

const Producto = {
  obtenerTodos: async () => {
    const [rows] = await db.query("SELECT * FROM productos");
    return rows;
  },

  obtenerPorId: async (id) => {
    const [rows] = await db.query(
      "SELECT * FROM productos WHERE id_producto = ?",
      [id]
    );

    return rows[0];
  },
};

module.exports = Producto;