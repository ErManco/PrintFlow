import { createContext, useState, useContext } from "react";

const AuthContext = createContext();

const API_URL = "http://localhost:3000/api/auth";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("printflow_user");

    return storedUser ? JSON.parse(storedUser) : null;
  });

  const login = async (email, password) => {
    try {
      const respuesta = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const datos = await respuesta.json();

      if (!respuesta.ok) {
        return {
          success: false,
          message: datos.message || "Credenciales incorrectas",
        };
      }

      setUser(datos.user);

      localStorage.setItem(
        "printflow_user",
        JSON.stringify(datos.user)
      );

      localStorage.setItem(
        "printflow_token",
        datos.token
      );

      return {
        success: true,
        role: datos.user.role,
      };
    } catch (error) {
      console.error("Error en login:", error);

      return {
        success: false,
        message: "No se pudo conectar con el servidor",
      };
    }
  };

  const registrar = async (name, email, password) => {
    try {
      const respuesta = await fetch(`${API_URL}/registro`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const datos = await respuesta.json();

      if (!respuesta.ok) {
        return {
          success: false,
          message:
            datos.message ||
            "No se pudo registrar el usuario",
        };
      }

      return {
        success: true,
        message: datos.message,
      };
    } catch (error) {
      console.error("Error en registro:", error);

      return {
        success: false,
        message: "No se pudo conectar con el servidor",
      };
    }
  };

  const logout = () => {
    setUser(null);

    localStorage.removeItem("printflow_user");
    localStorage.removeItem("printflow_token");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        registrar,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);