import { Link } from "react-router-dom";
import { useProductos } from "../context/ProductosContext";
import ProductCard from "../components/ProductCard";
import logoPrintFlow from "../assets/LogoPrintFlow.png"; // <-- Agregado

function Inicio() {
  const { productos } = useProductos();
  
  // Tomamos solo los primeros 3 productos para mostrarlos como "Destacados"
  const productosDestacados = productos.slice(0, 3);

  return (
    <main>
      {/* 1. HERO SECTION (Portada) */}
      <section className="hero-section">
        <div className="hero-content">
          <span className="badge-collection">COLECCIÓN 2026</span>
          <h1>Diseños que se llevan puestos.</h1>
          <p>
            Descubre nuestra colección de playeras premium con diseños exclusivos. 
            Calidad, comodidad y estilo en cada prenda.
          </p>
          <div className="hero-buttons">
            <Link to="/catalogo" className="btn-primary btn-large">
              Ver Catálogo
            </Link>
            <Link to="/personalizar" className="btn-secondary btn-large">
              Personalizar Playera
            </Link>
          </div>
        </div>
        <div className="hero-image">
          {/* Reemplazado el emoji por tu logo */}
          <div className="hero-logo-container">
            <img src={logoPrintFlow} alt="PrintFlow" className="hero-logo-img" />
          </div>
        </div>
      </section>

      {/* 2. SECCIÓN DE CARACTERÍSTICAS */}
      <section className="features-section">
        <div className="feature-card">
          <div className="feature-icon">✨</div>
          <h3>Diseños Exclusivos</h3>
          <p>Cada playera cuenta con un diseño único creado por nuestro equipo de artistas.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">💎</div>
          <h3>Calidad Premium</h3>
          <p>Utilizamos algodón de la más alta calidad para garantizar tu comodidad.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">🚚</div>
          <h3>Envío Rápido</h3>
          <p>Recibe tus playeras en la puerta de tu casa en tiempo récord.</p>
        </div>
      </section>

      {/* 3. PRODUCTOS DESTACADOS */}
      {productosDestacados.length > 0 && (
        <section className="featured-section">
          <div className="section-header">
            <h2>Diseños Destacados</h2>
            <Link to="/catalogo" className="link-ver-todo">Ver todos →</Link>
          </div>
          <div className="product-grid">
            {productosDestacados.map((producto) => (
              <ProductCard key={producto.id} producto={producto} />
            ))}
          </div>
        </section>
      )}

      {/* 4. CALL TO ACTION FINAL */}
      <section className="cta-section">
        <h2>¿Listo para encontrar tu estilo?</h2>
        <p>Explora todo nuestro catálogo y encuentra la playera perfecta para ti.</p>
        <Link to="/catalogo" className="btn-primary btn-large">
          Ir al Catálogo
        </Link>
      </section>
    </main>
  );
}

export default Inicio;