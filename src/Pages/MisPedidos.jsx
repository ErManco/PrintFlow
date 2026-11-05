import { useState } from "react";
import { pedidos as todosLosPedidos } from "../data/pedidos";
import { useAuth } from "../context/AuthContext";

function MisPedidos() {
  const { user } = useAuth();
  
  // Filtramos para que el cliente solo vea SUS pedidos
  const misPedidos = todosLosPedidos.filter(
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="empty-state">
          <div className="empty-icon-container">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
          <h3 className="empty-title">Aún no tienes pedidos</h3>
          <p className="empty-text">Cuando realices una compra, aparecerá aquí.</p>
        </div>
      )}
    </main>
  );
}

export default MisPedidos;