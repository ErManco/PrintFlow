import { useState } from "react";
import { pedidos as pedidosData } from "../data/pedidos";

function Pedidos() {
  // Simulamos la carga de datos de la base de datos
  const [pedidos] = useState(pedidosData);

  return (
    <main>
      {/* Encabezado */}
      <div className="catalog-header">
        <span className="badge-collection">ADMINISTRACIÓN</span>
        <h1>Lista de pedidos</h1>
        <p>Revisa y da seguimiento a los pedidos recibidos en la tienda.</p>
      </div>

      {/* Barra de herramientas (Preparada para la siguiente tarea de filtros/búsqueda) */}
      <div className="toolbar">
        <div className="toolbar-left">
          Todos los pedidos
          <span className="badge-count">{pedidos.length}</span>
        </div>
        <div className="toolbar-right">
          {pedidos.length} pedido{pedidos.length !== 1 && "s"} en total
        </div>
      </div>

      {/* Tabla o Estado Vacío */}
      {pedidos.length > 0 ? (
        <div className="table-container">
          {/* CA1: Tabla estructurada con las columnas requeridas */}
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Fecha</th>
                <th>Cliente</th>
                <th>Total</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {pedidos.map((pedido) => (
                <tr key={pedido.id}>
                  <td><strong>{pedido.id}</strong></td>
                  <td>{pedido.fecha}</td>
                  <td>{pedido.cliente}</td>
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
        // CA2: Estado vacío
        <div className="empty-state">
          <div className="empty-icon-container">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="empty-title">No hay pedidos recibidos aún</h3>
          <p className="empty-text">Los nuevos pedidos de los clientes aparecerán aquí.</p>
        </div>
      )}
    </main>
  );
}

export default Pedidos;