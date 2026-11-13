import { useState } from "react";
import { usePedidos } from "../context/PedidosContext"; // <-- Contexto global
import { useAuth } from "../context/AuthContext";
import PedidoDetalleCliente from "../components/PedidoDetalleCliente"; // <-- Modal de cliente

function MisPedidos() {
  const { pedidos } = usePedidos();
  const { user } = useAuth();
  const [pedidoSeleccionado, setPedidoSeleccionado] = useState(null);
  
  // Filtramos para que el cliente solo vea SUS pedidos
  const misPedidos = pedidos.filter(
    (pedido) => pedido.cliente === user?.name
  );

  return (
    <main>
      <div className="catalog-header">
        <span className="badge-collection">MI CUENTA</span>
        <h1>Mis pedidos</h1>
        <p>Consulta el estado de tus compras recientes, {user?.name || "Cliente"}.</p>
      </div>

      {misPedidos.length > 0 ? (
        <div className="table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Fecha</th>
                <th>Total</th>
                <th>Estado</th>
                <th>Acciones</th> {/* <-- Nueva columna */}
              </tr>
            </thead>
            <tbody>
              {misPedidos.map((pedido) => (
                <tr key={pedido.id}>
                  <td><strong>{pedido.id}</strong></td>
                  <td>{pedido.fecha}</td>
                  <td className="total-col">{pedido.total}</td>
                  <td>
                    <span className={`status-badge status-${pedido.estado.toLowerCase().replace(" ", "-")}`}>
                      {pedido.estado}
                    </span>
                  </td>
                  <td>
                    <button 
                      className="btn-ver-detalle" 
                      onClick={() => setPedidoSeleccionado(pedido)}
                    >
                      Ver seguimiento
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="empty-state">
          {/* ... (El estado vacío se queda igual) ... */}
        </div>
      )}

      {/* MODAL DEL CLIENTE */}
      {pedidoSeleccionado && (
        <PedidoDetalleCliente 
          pedido={pedidoSeleccionado} 
          onClose={() => setPedidoSeleccionado(null)}
        />
      )}
    </main>
  );
}

export default MisPedidos;