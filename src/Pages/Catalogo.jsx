import { useState } from "react";
import ProductCard from "../components/ProductCard";
import { useProductos } from "../context/ProductosContext";

function Catalogo() {
  const { productos } = useProductos();
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("Todas");

  // 1. Extraemos las categorías únicas de nuestros productos
  const categorias = ["Todas", ...new Set(productos.map((p) => p.categoria))];

  // 2. Filtramos los productos según la categoría seleccionada
  const productosFiltrados =
    categoriaSeleccionada === "Todas"
      ? productos
      : productos.filter((p) => p.categoria === categoriaSeleccionada);

  return (
    <main>
      {/* Encabezado */}
      <div className="catalog-header">
        <span className="badge-collection">COLECCIÓN 2026</span>
        <h1>Catálogo de playeras</h1>
        <p>Explora nuestras playeras y descubre los diseños disponibles.</p>
      </div>

      {/* Menú de Categorías (CA1) */}
      <div className="category-menu">
        {categorias.map((cat) => (
          <button
            key={cat}
            className={`category-btn ${categoriaSeleccionada === cat ? "active" : ""}`}
            onClick={() => setCategoriaSeleccionada(cat)} // CA2 y CA3
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Barra de herramientas / Contador */}
      <div className="toolbar">
        <div className="toolbar-left">
          {categoriaSeleccionada === "Todas" ? "Todos los diseños" : categoriaSeleccionada}
          <span className="badge-count">{productosFiltrados.length}</span>
        </div>
        <div className="toolbar-right">
          {productosFiltrados.length} producto{productosFiltrados.length !== 1 && "s"} registrado{productosFiltrados.length !== 1 && "s"}
        </div>
      </div>

      {/* Grid o Estado Vacío */}
      {productosFiltrados.length > 0 ? (
        <div className="product-grid">
          {productosFiltrados.map((producto) => (
            <ProductCard key={producto.id} producto={producto} />
          ))}
        </div>
      ) : (
        // CA4: Mensaje si no hay productos en esa categoría
        <div className="empty-state">
          <div className="empty-icon-container">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
            </svg>
          </div>
          <h3 className="empty-title">No hay productos disponibles</h3>
          <p className="empty-text">No encontramos diseños en esta categoría por el momento.</p>
        </div>
      )}
    </main>
  );
}

export default Catalogo;