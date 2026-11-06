const db = require("../config/db");

const Cliente = {
  buscarPorCorreo: async (correo) => {
    const [rows] = await db.query(
      `SELECT *
       FROM clientes
       WHERE correo = ?`,
      [correo]
    );

    return rows[0];
  },

  crear: async ({ nombre, correo, passwordHash }) => {
    const [resultado] = await db.query(
      `INSERT INTO clientes
       (nombre, telefono, correo, password_hash, rol)
       VALUES (?, NULL, ?, ?, 'client')`,
      [nombre, correo, passwordHash]
    );

    return resultado.insertId;
  },

  buscarPorId: async (id) => {
    const [rows] = await db.query(
      `SELECT
        id_cliente,
        nombre,
        telefono,
        correo,
        rol
       FROM clientes
       WHERE id_cliente = ?`,
      [id]
    );

    return rows[0];
  },
};

module.exports = Cliente;