import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Inicio from "./pages/Inicio";
import Catalogo from "./pages/Catalogo";
import ProductoDetalle from "./pages/ProductoDetalle";
import Clientes from "./pages/Clientes";
import Pedidos from "./pages/Pedidos";
import MisPedidos from "./pages/MisPedidos";
import Login from "./pages/Login";
import Registro from "./pages/Registro"; // Asegúrate de tener este archivo
import Carrito from "./pages/Carrito";   // Asegúrate de tener este archivo
import Contacto from "./pages/Contacto";
import AdminProductos from "./pages/AdminProductos";

function RutaAdmin({ children }) {
  const { user } = useAuth();
  if (!user || user.role !== "admin") {
    return <Navigate to="/login" replace />;
  }
  return children;
}

function App() {
  return (
    <>
      <Header />
      <Routes>
        {/* Rutas Públicas */}
        <Route path="/" element={<Inicio />} />
        <Route path="/catalogo" element={<Catalogo />} />
        <Route path="/producto/:id" element={<ProductoDetalle />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/carrito" element={<Carrito />} />
        <Route path="/contacto" element={<Contacto />} />

        {/* Rutas de Cliente */}
        <Route path="/mis-pedidos" element={<MisPedidos />} />

        {/* Rutas Protegidas de Admin */}
        <Route path="/clientes" element={<RutaAdmin><Clientes /></RutaAdmin>} />
        <Route path="/pedidos" element={<RutaAdmin><Pedidos /></RutaAdmin>} />
        <Route path="/admin/productos" element={<RutaAdmin><AdminProductos /></RutaAdmin>} />
        
        {/* Ruta comodín para páginas no encontradas (Opcional) */}
        <Route path="*" element={<div style={{textAlign: "center", padding: "4rem"}}><h1>404 - Página no encontrada</h1></div>} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;