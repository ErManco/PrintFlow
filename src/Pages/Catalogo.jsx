import { useState, useEffect } from "react";
import { productos as productosData } from "../data/productos";
import ProductCard from "../components/ProductCard";
import EmptyState from "../components/EmptyState";

function Catalogo() {
  // Simulamos que los productos vienen de un estado.
  // Cuando conectes una API, aquí harás el fetch.
  const [productos, setProductos] = useState(productosData);

  // ⚠️ Este botón es solo de prueba. Bórralo cuando ya no lo necesites.
  const toggleEstadoVacio = () => {
    setProductos((prev) => (prev.length > 0 ? [] : productosData));
  };

  return (
    <main>
      {/* Encabezado */}
      <div className="catalog-header">
        <span className="badge-collection">COLECCIÓN 2026</span>
        <h1>Catálogo de playeras</h1>
        <p>Explora nuestras playeras y descubre los diseños disponibles.</p>
      </div>

      {/* Barra de herramientas */}
      <div className="toolbar">
        <div className="toolbar-left">
          Todos los diseños
          <span className="badge-count">{productos.length}</span>
        </div>
        <div className="toolbar-right">
          {productos.length} producto{productos.length !== 1 && "s"} registrado{productos.length !== 1 && "s"}
        </div>
      </div>

      {/* Grid o estado vacío */}
      {productos.length > 0 ? (
        <div className="product-grid">
          {productos.map((producto) => (
            <ProductCard key={producto.id} producto={producto} />
          ))}
        </div>
      ) : (
        <EmptyState />
      )}

      {/* ⚠️ Botón de prueba — quítalo cuando ya no lo necesites */}
      <button className="toggle-dev" onClick={toggleEstadoVacio}>
        Probar Estado Vacío
      </button>
    </main>
  );
}

export default Catalogo;