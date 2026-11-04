import { useParams, useNavigate } from "react-router-dom";
import { productos } from "../data/productos";

function ProductoDetalle() {
  const { id } = useParams(); // Obtenemos el ID de la URL
  const navigate = useNavigate(); // Para el botón de "Volver"

  // Buscamos el producto en nuestros datos
  const producto = productos.find((p) => p.id === parseInt(id));

  // Si no existe el producto, mostramos un aviso
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

  return (
    <main className="product-detail-container">
      {/* Botón para regresar */}
      <button className="btn-back" onClick={() => navigate(-1)}>
        ← Volver
      </button>

      <div className="product-detail-layout">
        {/* Lado Izquierdo: Imagen */}
        <div className="product-detail-image">
          <div className={`shirt-mockup ${producto.imagen}`}></div>
        </div>

        {/* Lado Derecho: Información */}
        <div className="product-detail-info">
          <span className="badge-collection">{producto.categoria}</span>
          <h1>{producto.titulo}</h1>
          
          {/* Precio simulado */}
          <p className="product-price">$299.00 MXN</p>
          
          <p className="product-detail-desc">{producto.descripcion}</p>

          <hr className="divider" />

          {/* Tallas */}
          <div className="selector-group">
            <h3>Tallas disponibles</h3>
            <div className="options-container">
              <button className="option-btn">S</button>
              <button className="option-btn active">M</button>
              <button className="option-btn">L</button>
              <button className="option-btn">XL</button>
            </div>
          </div>

          {/* Colores */}
          <div className="selector-group">
            <h3>Colores disponibles</h3>
            <div className="options-container">
              <button className="color-btn" style={{ backgroundColor: '#f8f5f0' }}></button>
              <button className="color-btn active" style={{ backgroundColor: '#1f2937' }}></button>
              <button className="color-btn" style={{ backgroundColor: '#e5e7eb' }}></button>
            </div>
          </div>

          {/* Botón de acción principal */}
          <button className="btn-primary btn-large" onClick={() => alert('¡Agregado al carrito!')}>
            Agregar al carrito
          </button>
        </div>
      </div>
    </main>
  );
}

export default ProductoDetalle;