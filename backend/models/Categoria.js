const db = require("../config/db");

const Categoria = {
  obtenerTodas: async () => {
    const [rows] = await db.query(`
      SELECT
        id_categoria,
        nombre
      FROM categorias
      ORDER BY nombre ASC
    `);

    return rows;
  },
};

module.exports = Categoria;