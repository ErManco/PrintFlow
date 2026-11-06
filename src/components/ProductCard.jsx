import { Link } from "react-router-dom";

function ProductCard({ producto }) {
  const imagen =
    producto.imagen || "";

  const esImagenReal =
    imagen.startsWith("data:image") ||
    imagen.startsWith("http") ||
    imagen.includes(".");

  const precio = Number(
    producto.precio || 299
  ).toFixed(2);

  return (
    <Link
      to={`/producto/${producto.id}`}
      className="product-card-link"
    >
      <article className="product-card">
        <div className="product-image-container">
          {esImagenReal ? (
            <img
              src={imagen}
              alt={`Diseño ${producto.titulo}`}
              className="real-shirt-img"
            />
          ) : (
            <div
              className={`shirt-mockup ${imagen}`}
            ></div>
          )}

          <span className="product-badge">
            {producto.categoria}
          </span>
        </div>

        <div className="product-info">
          <h3 className="product-title">
            {producto.titulo}
          </h3>

          <p className="product-description">
            {producto.descripcion}
          </p>

          <p className="product-card-price">
            ${precio} MXN
          </p>
        </div>
      </article>
    </Link>
  );
}

export default ProductCard;