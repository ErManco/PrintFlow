const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Cliente = require("../models/Cliente");

const registrar = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Todos los campos son obligatorios",
      });
    }

    const existente = await Cliente.buscarPorCorreo(email);

    if (existente) {
      return res.status(409).json({
        success: false,
        message: "Este correo ya está registrado.",
      });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const idCliente = await Cliente.crear({
      nombre: name,
      correo: email,
      passwordHash,
    });

    res.status(201).json({
      success: true,
      id: idCliente,
      message: "Usuario registrado correctamente",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Error al registrar usuario",
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const cliente = await Cliente.buscarPorCorreo(email);

    if (!cliente || !cliente.password_hash) {
      return res.status(401).json({
        success: false,
        message: "Credenciales incorrectas",
      });
    }

    const passwordCorrecta = await bcrypt.compare(
      password,
      cliente.password_hash
    );

    if (!passwordCorrecta) {
      return res.status(401).json({
        success: false,
        message: "Credenciales incorrectas",
      });
    }

    const token = jwt.sign(
      {
        id_cliente: cliente.id_cliente,
        rol: cliente.rol,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "8h",
      }
    );

    res.json({
      success: true,

      token,

      user: {
        id: cliente.id_cliente,
        name: cliente.nombre,
        email: cliente.correo,
        role: cliente.rol,
      },
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Error al iniciar sesión",
    });
  }
};

module.exports = {
  registrar,
  login,
};