function ProductCard({ producto }) {
  return (
    <article className="product-card">
      <div className="product-image-container">
        <div className={`shirt-mockup ${producto.imagen}`}></div>
        <span className="product-badge">{producto.categoria}</span>
      </div>
      <div className="product-info">
        <h3 className="product-title">{producto.titulo}</h3>
        <p className="product-description">{producto.descripcion}</p>
      </div>
    </article>
  );
}

export default ProductCard;