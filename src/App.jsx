import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Inicio from "./pages/Inicio";
import Catalogo from "./pages/Catalogo";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/catalogo" element={<Catalogo />} />
        {/* Aquí agregarás más rutas */}
      </Routes>
      <Footer />
    </>
  );
}

export default App;