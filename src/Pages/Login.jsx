import { useState } from "react";
import {
  Link,
  useNavigate,
} from "react-router-dom";

import { useAuth } from "../context/AuthContext";

function Login() {
  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [error, setError] =
    useState("");

  const [cargando, setCargando] =
    useState(false);

  const { login } = useAuth();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setCargando(true);

    const result = await login(
      email,
      password
    );

    if (result.success) {
      if (result.role === "admin") {
        navigate("/pedidos");
      } else {
        navigate("/catalogo");
      }
    } else {
      setError(result.message);
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
        <h1>Iniciar Sesión</h1>

        <p>
          Ingresa a tu cuenta de
          PrintFlow.
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
            placeholder="••••••••"
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
            ? "Ingresando..."
            : "Entrar"}
        </button>

        <p
          style={{
            textAlign: "center",
            marginTop: "1rem",
            fontSize: "0.9rem",
            color: "#6b7280",
          }}
        >
          ¿No tienes cuenta?{" "}

          <Link
            to="/registro"
            style={{
              color: "#4f46e5",
              fontWeight: "bold",
            }}
          >
            Regístrate aquí
          </Link>
        </p>
      </form>
    </main>
  );
}

export default Login;