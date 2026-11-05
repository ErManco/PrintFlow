import { createContext, useState, useContext } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("printflow_user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const login = (email, password) => {
    // Credenciales de admin fijas
    if (email === "admin@printflow.com" && password === "admin123") {
      const adminUser = { id: 1, name: "Administrador", role: "admin", email };
      setUser(adminUser);
      localStorage.setItem("printflow_user", JSON.stringify(adminUser));
      return { success: true, role: "admin" };
    } 
    
    // Validar con usuarios registrados
    const usuariosGuardados = JSON.parse(localStorage.getItem("printflow_usuarios") || "[]");
    const usuarioEncontrado = usuariosGuardados.find(u => u.email === email && u.password === password);

    if (usuarioEncontrado) {
      const { password: _, ...usuarioSinPass } = usuarioEncontrado; // No guardamos la contraseña en la sesión
      setUser(usuarioSinPass);
      localStorage.setItem("printflow_user", JSON.stringify(usuarioSinPass));
      return { success: true, role: "client" };
    }

    return { success: false, message: "Credenciales incorrectas" };
  };

  const registrar = (name, email, password) => {
    const usuariosGuardados = JSON.parse(localStorage.getItem("printflow_usuarios") || "[]");
    
    // Validar que el correo no exista
    if (usuariosGuardados.some(u => u.email === email) || email === "admin@printflow.com") {
      return { success: false, message: "Este correo ya está registrado." };
    }

    const nuevoUsuario = {
      id: Date.now(),
      name,
      email,
      password,
      role: "client"
    };

    // Guardar en la "BD"
    localStorage.setItem("printflow_usuarios", JSON.stringify([...usuariosGuardados, nuevoUsuario]));
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("printflow_user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, registrar }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);