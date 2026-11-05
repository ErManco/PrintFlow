import { createContext, useState, useEffect, useContext } from "react";

const ProductosContext = createContext();

export function ProductosProvider({ children }) {
  // Inicializamos leyendo del localStorage o con un array vacío
  const [productos, setProductos] = useState(() => {
    const guardados = localStorage.getItem("printflow_productos");
    return guardados ? JSON.parse(guardados) : []; // <-- Array vacío en lugar de los ejemplos
  });

  // Cada que cambien los productos, los guardamos en localStorage
  useEffect(() => {
    localStorage.setItem("printflow_productos", JSON.stringify(productos));
  }, [productos]);

  const agregarProducto = (nuevoProducto) => {
  // Genera un ID basado en el timestamp actual pero más corto
  const nuevoId = Date.now().toString().slice(-6); 
  const productoConId = { ...nuevoProducto, id: nuevoId };
  setProductos((prev) => [...prev, productoConId]);
};

  return (
    <ProductosContext.Provider value={{ productos, agregarProducto }}>
      {children}
    </ProductosContext.Provider>
  );
}

export const useProductos = () => useContext(ProductosContext);