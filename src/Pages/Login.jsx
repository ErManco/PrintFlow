import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = login(email, password);
    if (result.success) {
      navigate(result.role === "admin" ? "/pedidos" : "/catalogo");
    } else {
      setError(result.message);
    }
  };

  return (
    <main style={{ maxWidth: "420px", margin: "4rem auto", padding: "0 1rem" }}>
      <div className="catalog-header" style={{ textAlign: "center" }}>
        <h1>Iniciar Sesión</h1>
        <p>Ingresa a tu cuenta de PrintFlow</p>
      </div>

      <form onSubmit={handleSubmit} className="login-form">
        {error && <div className="error-msg">{error}</div>}
        
        <div className="campo">
          <label>Correo electrónico</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
            placeholder="tu@email.com" 
          />
        </div>
        
        <div className="campo">
          <label>Contraseña</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
            placeholder="••••••••" 
          />
        </div>

        <button type="submit" className="btn-primary btn-large" style={{ width: "100%" }}>
          Entrar
        </button>
      </form>
    </main>
  );
}

export default Login;