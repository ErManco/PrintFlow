import { useState } from "react";
import { usePedidos } from "../context/PedidosContext"; // <-- Importamos el contexto
import PedidoDetalleAdmin from "../components/PedidoDetalleAdmin";

function Pedidos() {
  const { pedidos, actualizarEstadoPedido } = usePedidos(); // <-- Usamos el contexto
  const [pedidoSeleccionado, setPedidoSeleccionado] = useState(null);

  const handleUpdateStatus = (idPedido, nuevoEstado) => {
    actualizarEstadoPedido(idPedido, nuevoEstado);
    // Actualizamos el modal para que refleje el cambio al instante
    setPedidoSeleccionado((prev) => ({ ...prev, estado: nuevoEstado }));
  };

  return (
    <main>
      {/* ... (El encabezado y la tabla se quedan igual) ... */}
      
      {/* En la tabla, el botón ahora llama a handleUpdateStatus si es necesario, 
          o solo actualiza el modal. Aquí está el fragmento de la tabla: */}
      <tbody>
        {pedidos.map((pedido) => (
          <tr key={pedido.id}>
            {/* ... (las columnas de ID, fecha, cliente, total) ... */}
            <td>
              <span className={`status-badge status-${pedido.estado.toLowerCase().replace(" ", "-")}`}>
                {pedido.estado}
              </span>
            </td>
            <td>
              <button className="btn-ver-detalle" onClick={() => setPedidoSeleccionado(pedido)}>
                Ver seguimiento
              </button>
            </td>
          </tr>
        ))}
      </tbody>

      {pedidoSeleccionado && (
        <PedidoDetalleAdmin 
          pedido={pedidoSeleccionado} 
          onClose={() => setPedidoSeleccionado(null)}
          onUpdateStatus={handleUpdateStatus} // <-- Pasamos la función
        />
      )}
    </main>
  );
}

export default Pedidos;