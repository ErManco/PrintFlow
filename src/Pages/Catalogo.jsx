import { useState } from "react";

import ProductCard from "../components/ProductCard";

import {
  useProductos,
} from "../context/ProductosContext";

import {
  useCategorias,
} from "../context/CategoriasContext";

function Catalogo() {
  const {
    productos,
    cargando,
  } = useProductos();

  const {
    categorias,
    cargandoCategorias,
  } = useCategorias();

  const [
    categoriaSeleccionada,
    setCategoriaSeleccionada,
  ] = useState("Todas");

  const productosFiltrados =
    categoriaSeleccionada ===
    "Todas"
      ? productos
      : productos.filter(
          (producto) =>
            producto.categoria ===
            categoriaSeleccionada
        );

  if (
    cargando ||
    cargandoCategorias
  ) {
    return (
      <main>
        <div className="empty-state">
          <h3 className="empty-title">
            Cargando catálogo...
          </h3>

          <p className="empty-text">
            Estamos preparando los
            productos disponibles.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main>
      {/* ENCABEZADO */}

      <div className="catalog-header">
        <span className="badge-collection">
          COLECCIÓN 2026
        </span>

        <h1>
          Catálogo de playeras
        </h1>

        <p>
          Explora nuestras playeras y
          descubre los diseños
          disponibles.
        </p>
      </div>

      {/* CATEGORÍAS */}

      <div className="category-menu">
        <button
          className={`category-btn ${
            categoriaSeleccionada ===
            "Todas"
              ? "active"
              : ""
          }`}
          onClick={() =>
            setCategoriaSeleccionada(
              "Todas"
            )
          }
        >
          Todas
        </button>

        {categorias.map(
          (categoria) => (
            <button
              key={
                categoria.id_categoria
              }
              className={`category-btn ${
                categoriaSeleccionada ===
                categoria.nombre
                  ? "active"
                  : ""
              }`}
              onClick={() =>
                setCategoriaSeleccionada(
                  categoria.nombre
                )
              }
            >
              {categoria.nombre}
            </button>
          )
        )}
      </div>

      {/* CONTADOR */}

      <div className="toolbar">
        <div className="toolbar-left">
          {categoriaSeleccionada ===
          "Todas"
            ? "Todos los diseños"
            : categoriaSeleccionada}

          <span className="badge-count">
            {
              productosFiltrados.length
            }
          </span>
        </div>

        <div className="toolbar-right">
          {
            productosFiltrados.length
          }{" "}
          producto
          {productosFiltrados.length !==
            1 && "s"}{" "}
          registrado
          {productosFiltrados.length !==
            1 && "s"}
        </div>
      </div>

      {/* PRODUCTOS */}

      {productosFiltrados.length >
      0 ? (
        <div className="product-grid">
          {productosFiltrados.map(
            (producto) => (
              <ProductCard
                key={producto.id}
                producto={producto}
              />
            )
          )}
        </div>
      ) : (
        <div className="empty-state">
          <div className="empty-icon-container">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z"
              />
            </svg>
          </div>

          <h3 className="empty-title">
            No hay productos disponibles
          </h3>

          <p className="empty-text">
            {categoriaSeleccionada ===
            "Todas"
              ? "No hay playeras registradas por el momento."
              : `No encontramos diseños en la categoría ${categoriaSeleccionada} por el momento.`}
          </p>
        </div>
      )}
    </main>
  );
}

export default Catalogo;