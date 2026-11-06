import {
  createContext,
  useState,
  useEffect,
  useContext,
} from "react";

const ProductosContext = createContext();

const API_URL = "http://localhost:3000/api/productos";

function normalizarProducto(producto) {
  let colores = producto.colores || {};

  if (typeof colores === "string") {
    try {
      colores = JSON.parse(colores);
    } catch {
      colores = {};
    }
  }

  return {
    ...producto,

    // MySQL usa id_producto.
    // React seguirá usando id.
    id: producto.id || producto.id_producto,

    colores,
  };
}

export function ProductosProvider({ children }) {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const cargarProductos = async () => {
      try {
        const respuesta = await fetch(API_URL);

        if (!respuesta.ok) {
          throw new Error(
            "No se pudieron obtener los productos"
          );
        }

        const datos = await respuesta.json();

        const productosNormalizados =
          datos.map(normalizarProducto);

        setProductos(productosNormalizados);
      } catch (error) {
        console.error(
          "Error al cargar productos:",
          error
        );
      } finally {
        setCargando(false);
      }
    };

    cargarProductos();
  }, []);

  const agregarProducto = async (nuevoProducto) => {
    const respuesta = await fetch(API_URL, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(nuevoProducto),
    });

    const datos = await respuesta.json();

    if (!respuesta.ok) {
      throw new Error(
        datos.message ||
          "No se pudo guardar el producto"
      );
    }

    const productoNormalizado =
      normalizarProducto(datos);

    setProductos((prev) => [
      ...prev,
      productoNormalizado,
    ]);

    return productoNormalizado;
  };

  return (
    <ProductosContext.Provider
      value={{
        productos,
        agregarProducto,
        cargando,
      }}
    >
      {children}
    </ProductosContext.Provider>
  );
}

export const useProductos = () =>
  useContext(ProductosContext);