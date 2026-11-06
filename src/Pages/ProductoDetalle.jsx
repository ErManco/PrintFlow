import {
  useState,
  useEffect,
} from "react";

import {
  useParams,
  useNavigate,
} from "react-router-dom";

import { useProductos } from "../context/ProductosContext";
import { useCarrito } from "../context/CarritoContext";
import { useAuth } from "../context/AuthContext";

function ProductoDetalle() {
  const { id } = useParams();

  const navigate = useNavigate();

  const {
    productos,
    cargando,
  } = useProductos();

  const {
    agregarAlCarrito,
  } = useCarrito();

  const { user } = useAuth();

  const [
    tallaSeleccionada,
    setTallaSeleccionada,
  ] = useState("M");

  const [
    colorSeleccionado,
    setColorSeleccionado,
  ] = useState(null);

  const producto = productos.find(
    (p) =>
      String(p.id) === String(id)
  );

  useEffect(() => {
    if (
      producto?.colores &&
      Object.keys(
        producto.colores
      ).length > 0
    ) {
      const primerColor =
        Object.keys(
          producto.colores
        )[0];

      setColorSeleccionado(
        primerColor
      );
    } else {
      setColorSeleccionado(null);
    }
  }, [producto]);

  if (cargando) {
    return (
      <main className="empty-state">
        <h3 className="empty-title">
          Cargando producto...
        </h3>
      </main>
    );
  }

  if (!producto) {
    return (
      <main className="empty-state">
        <h3 className="empty-title">
          Producto no encontrado
        </h3>

        <button
          className="btn-primary"
          style={{
            marginTop: "1rem",
          }}
          onClick={() =>
            navigate("/catalogo")
          }
        >
          Volver al catálogo
        </button>
      </main>
    );
  }

  const imagenAMostrar =
    colorSeleccionado &&
    producto.colores
      ? producto.colores[
          colorSeleccionado
        ]
      : producto.imagen;

  const imagen =
    imagenAMostrar || "";

  const esImagenReal =
    imagen.startsWith("data:image") ||
    imagen.startsWith("http") ||
    imagen.includes(".");

  const precio = Number(
    producto.precio || 299
  ).toFixed(2);

  const handleAgregarCarrito = () => {
    if (!user) {
      alert(
        "Debes iniciar sesión para agregar productos al carrito."
      );

      navigate("/login");

      return;
    }

    agregarAlCarrito(
      producto,
      tallaSeleccionada,
      colorSeleccionado
    );

    alert(
      `Agregado al carrito: Talla ${tallaSeleccionada}${
        colorSeleccionado
          ? `, Color ${colorSeleccionado}`
          : ""
      }`
    );
  };

  return (
    <main className="product-detail-container">
      <button
        className="btn-back"
        onClick={() =>
          navigate("/catalogo")
        }
      >
        ← Volver al catálogo
      </button>

      <div className="product-detail-layout">
        <div className="product-detail-image">
          {esImagenReal ? (
            <img
              src={imagen}
              alt={producto.titulo}
              className="real-shirt-img"
            />
          ) : (
            <div
              className={`shirt-mockup ${imagen}`}
            ></div>
          )}
        </div>

        <div className="product-detail-info">
          <span className="badge-collection">
            {producto.categoria}
          </span>

          <h1>
            {producto.titulo}
          </h1>

          <p className="product-price">
            ${precio} MXN
          </p>

          <p className="product-detail-desc">
            {producto.descripcion}
          </p>

          <hr className="divider" />

          <div className="selector-group">
            <h3>
              Tallas disponibles
            </h3>

            <div className="options-container">
              {[
                "S",
                "M",
                "L",
                "XL",
              ].map((talla) => (
                <button
                  key={talla}
                  className={`option-btn ${
                    tallaSeleccionada ===
                    talla
                      ? "active"
                      : ""
                  }`}
                  onClick={() =>
                    setTallaSeleccionada(
                      talla
                    )
                  }
                >
                  {talla}
                </button>
              ))}
            </div>
          </div>

          {producto.colores &&
            Object.keys(
              producto.colores
            ).length > 0 && (
              <div className="selector-group">
                <h3>
                  Colores disponibles
                </h3>

                <div className="options-container">
                  {Object.keys(
                    producto.colores
                  ).map((hex) => (
                    <button
                      key={hex}
                      className={`color-btn ${
                        colorSeleccionado ===
                        hex
                          ? "active"
                          : ""
                      }`}
                      style={{
                        backgroundColor:
                          hex,
                      }}
                      onClick={() =>
                        setColorSeleccionado(
                          hex
                        )
                      }
                      title={hex}
                    ></button>
                  ))}
                </div>
              </div>
            )}

          <button
            className="btn-primary btn-large"
            onClick={
              handleAgregarCarrito
            }
          >
            {user
              ? "Agregar al carrito"
              : "Inicia sesión para comprar"}
          </button>
        </div>
      </div>
    </main>
  );
}

export default ProductoDetalle;