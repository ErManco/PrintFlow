import { useState } from "react";

import {
  useNavigate,
  Link,
} from "react-router-dom";

import { useAuth } from "../context/AuthContext";

function Registro() {
  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [error, setError] =
    useState("");

  const [cargando, setCargando] =
    useState(false);

  const {
    registrar,
    login,
  } = useAuth();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setCargando(true);

    const result =
      await registrar(
        name,
        email,
        password
      );

    if (!result.success) {
      setError(result.message);
      setCargando(false);

      return;
    }

    const loginResult =
      await login(
        email,
        password
      );

    if (loginResult.success) {
      alert(
        "¡Bienvenido a PrintFlow!"
      );

      navigate("/catalogo");
    } else {
      setError(
        "Tu cuenta fue creada, pero no se pudo iniciar sesión."
      );
    }

    setCargando(false);
  };

  return (
    <main
      style={{
        maxWidth: "420px",
        margin: "4rem auto",
        padding: "0 1rem",
      }}
    >
      <div
        className="catalog-header"
        style={{
          textAlign: "center",
        }}
      >
        <h1>Crear Cuenta</h1>

        <p>
          Únete a PrintFlow para hacer
          tus pedidos.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="login-form"
      >
        {error && (
          <div className="error-msg">
            {error}
          </div>
        )}

        <div className="campo">
          <label>
            Nombre completo
          </label>

          <input
            type="text"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            required
            placeholder="Ej. Juan Pérez"
          />
        </div>

        <div className="campo">
          <label>
            Correo electrónico
          </label>

          <input
            type="email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            required
            placeholder="tu@email.com"
          />
        </div>

        <div className="campo">
          <label>
            Contraseña
          </label>

          <input
            type="password"
            value={password}
            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }
            required
            minLength="6"
            placeholder="Crea una contraseña"
          />
        </div>

        <button
          type="submit"
          className="btn-primary btn-large"
          style={{
            width: "100%",
          }}
          disabled={cargando}
        >
          {cargando
            ? "Registrando..."
            : "Registrarme"}
        </button>

        <p
          style={{
            textAlign: "center",
            marginTop: "1rem",
            fontSize: "0.9rem",
            color: "#6b7280",
          }}
        >
          ¿Ya tienes cuenta?{" "}

          <Link
            to="/login"
            style={{
              color: "#4f46e5",
              fontWeight: "bold",
            }}
          >
            Inicia sesión aquí
          </Link>
        </p>
      </form>
    </main>
  );
}

export default Registro;