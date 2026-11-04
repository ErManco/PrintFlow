import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Inicio from "./pages/Inicio";
import Catalogo from "./pages/Catalogo";
import ProductoDetalle from "./pages/ProductoDetalle"; // <-- ¡ESTA LÍNEA FALTA!
import Clientes from "./pages/Clientes"; // <-- Y revisa que esta también esté

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/catalogo" element={<Catalogo />} />
        <Route path="/producto/:id" element={<ProductoDetalle />} />
        <Route path="/clientes" element={<Clientes />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;