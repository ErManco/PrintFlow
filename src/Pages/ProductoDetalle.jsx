import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useProductos } from "../context/ProductosContext";
import { useCarrito } from "../context/CarritoContext";

function ProductoDetalle() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { productos } = useProductos();
  const { agregarAlCarrito } = useCarrito();

  const [tallaSeleccionada, setTallaSeleccionada] = useState("M");
  const [colorSeleccionado, setColorSeleccionado] = useState(null);

  const producto = productos.find((p) => String(p.id) === String(id));

  // Efecto para inicializar el primer color disponible
  useEffect(() => {
    if (producto?.colores) {
      const primerColor = Object.keys(producto.colores)[0];
      if (primerColor) setColorSeleccionado(primerColor);
    }
  }, [producto]);

  if (!producto) {
    return (
      <main className="empty-state">
        <h3 className="empty-title">Producto no encontrado</h3>
        <button className="btn-primary" style={{ marginTop: '1rem' }} onClick={() => navigate('/catalogo')}>
          Volver al catálogo
        </button>
      </main>
    );
  }

  // Determinamos qué imagen mostrar: Si hay un color seleccionado, usamos su imagen.
  // Si no, usamos la imagen general del producto.
  const imagenAMostrar = colorSeleccionado && producto.colores 
    ? producto.colores[colorSeleccionado] 
    : producto.imagen;

  const esImagenReal = imagenAMostrar?.startsWith("data:image") || imagenAMostrar?.startsWith("http");

  return (
    <main className="product-detail-container">
      <button className="btn-back" onClick={() => navigate(-1)}>
        ← Volver al catálogo
      </button>

      <div className="product-detail-layout">
        {/* IMAGEN DINÁMICA */}
        <div className="product-detail-image">
          {esImagenReal ? (
            <img src={imagenAMostrar} alt={producto.titulo} className="real-shirt-img" />
          ) : (
            <div className={`shirt-mockup ${imagenAMostrar}`}></div>
          )}
        </div>

        <div className="product-detail-info">
          <span className="badge-collection">{producto.categoria}</span>
          <h1>{producto.titulo}</h1>
          <p className="product-price">${producto.precio || "299"}.00 MXN</p>
          <p className="product-detail-desc">{producto.descripcion}</p>

          <hr className="divider" />

          <div className="selector-group">
            <h3>Tallas disponibles</h3>
            <div className="options-container">
              {["S", "M", "L", "XL"].map((talla) => (
                <button 
                  key={talla}
                  className={`option-btn ${tallaSeleccionada === talla ? "active" : ""}`}
                  onClick={() => setTallaSeleccionada(talla)}
                >
                  {talla}
                </button>
              ))}
            </div>
          </div>

          {/* SELECTOR DE COLORES DINÁMICO */}
          {producto.colores && Object.keys(producto.colores).length > 0 && (
            <div className="selector-group">
              <h3>Colores disponibles</h3>
              <div className="options-container">
                {Object.keys(producto.colores).map((hex) => (
                  <button 
                    key={hex}
                    className={`color-btn ${colorSeleccionado === hex ? "active" : ""}`} 
                    style={{ backgroundColor: hex }}
                    onClick={() => setColorSeleccionado(hex)}
                    title={hex}
                  ></button>
                ))}
              </div>
            </div>
          )}

          <button 
            className="btn-primary btn-large" 
            onClick={() => {
              agregarAlCarrito(producto, tallaSeleccionada, colorSeleccionado);
              alert(`Agregado: Talla ${tallaSeleccionada} ${colorSeleccionado ? `, Color ${colorSeleccionado}` : ''}`);
            }}
          >
            Agregar al carrito
          </button>
        </div>
      </div>
    </main>
  );
}

export default ProductoDetalle;