import { Link } from "react-router-dom";

function ProductCard({ producto }) {
  // Verificamos si la imagen es una URL real o base64 (subida por admin)
  const esImagenReal =
    producto.imagen.startsWith("data:image") ||
    producto.imagen.startsWith("http") ||
    producto.imagen.includes("."); // Por si usas rutas como "/img/playera.jpg"

  return (
    // Envolvemos todo en un Link hacia el detalle usando el ID
    <Link to={`/producto/${producto.id}`} className="product-card-link">
      <article className="product-card">
        <div className="product-image-container">
          {esImagenReal ? (
            <img
              src={producto.imagen}
              alt={`Diseño ${producto.titulo}`}
              className="real-shirt-img"
            />
          ) : (
            <div className={`shirt-mockup ${producto.imagen}`}></div>
          )}
          <span className="product-badge">{producto.categoria}</span>
        </div>

        <div className="product-info">
          <h3 className="product-title">{producto.titulo}</h3>
          <p className="product-description">{producto.descripcion}</p>
          {/* Agregamos el precio para que sea consistente */}
          <p className="product-card-price">
            {producto.precio ? `$${producto.precio} MXN` : "$299.00 MXN"}
          </p>
        </div>
      </article>
    </Link>
  );
}

export default ProductCard;