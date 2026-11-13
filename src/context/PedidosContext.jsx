import { createContext, useState, useEffect, useContext } from "react";
import { pedidos as pedidosIniciales } from "../data/pedidos";

const PedidosContext = createContext();

export function PedidosProvider({ children }) {
  const [pedidos, setPedidos] = useState(() => {
    const guardados = localStorage.getItem("printflow_pedidos");
    return guardados ? JSON.parse(guardados) : pedidosIniciales;
  });

  useEffect(() => {
    localStorage.setItem("printflow_pedidos", JSON.stringify(pedidos));
  }, [pedidos]);

  const actualizarEstadoPedido = (idPedido, nuevoEstado) => {
    setPedidos((prev) =>
      prev.map((p) => (p.id === idPedido ? { ...p, estado: nuevoEstado } : p))
    );
  };

  const agregarPedido = (nuevoPedido) => {
    setPedidos((prev) => [nuevoPedido, ...prev]); // Se agrega al principio
  };

  return (
    <PedidosContext.Provider value={{ pedidos, actualizarEstadoPedido, agregarPedido }}>
      {children}
    </PedidosContext.Provider>
  );
}

export const usePedidos = () => useContext(PedidosContext);