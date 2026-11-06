import {
  createContext,
  useState,
  useEffect,
  useContext,
} from "react";

const CarritoContext = createContext();

export function CarritoProvider({ children }) {
  const [carrito, setCarrito] = useState(() => {
    const guardado =
      localStorage.getItem("printflow_carrito");

    return guardado
      ? JSON.parse(guardado)
      : [];
  });

  useEffect(() => {
    localStorage.setItem(
      "printflow_carrito",
      JSON.stringify(carrito)
    );
  }, [carrito]);

  const agregarAlCarrito = (
    producto,
    talla,
    color
  ) => {
    const itemId =
      `${producto.id}-${talla}-${color || "unico"}`;

    setCarrito((prev) => {
      const existe = prev.find(
        (item) =>
          item.itemId === itemId
      );

      if (existe) {
        return prev.map((item) =>
          item.itemId === itemId
            ? {
                ...item,
                cantidad:
                  item.cantidad + 1,
              }
            : item
        );
      }

      return [
        ...prev,
        {
          itemId,
          id: producto.id,
          titulo: producto.titulo,
          precio: producto.precio || "299",

          imagen:
            color &&
            producto.colores
              ? producto.colores[color]
              : producto.imagen,

          talla,
          color,
          cantidad: 1,
        },
      ];
    });
  };

  const eliminarDelCarrito = (itemId) => {
    setCarrito((prev) =>
      prev.filter(
        (item) =>
          item.itemId !== itemId
      )
    );
  };

  const vaciarCarrito = () => {
    setCarrito([]);
  };

  const total = carrito.reduce(
    (acc, item) =>
      acc +
      Number(item.precio) *
        item.cantidad,
    0
  );

  return (
    <CarritoContext.Provider
      value={{
        carrito,
        agregarAlCarrito,
        eliminarDelCarrito,
        vaciarCarrito,
        total,
      }}
    >
      {children}
    </CarritoContext.Provider>
  );
}

export const useCarrito = () =>
  useContext(CarritoContext);