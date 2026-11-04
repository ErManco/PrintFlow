function ClienteDetalle({ cliente, onClose }) {
  if (!cliente) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>

        <div className="modal-header">
          <div className="modal-avatar">
            {cliente.nombre.charAt(0).toUpperCase()}
          </div>
          <div>
            <h2>{cliente.nombre}</h2>
            <span className="badge-collection">Cliente #{cliente.id}</span>
          </div>
        </div>

        <div className="modal-body">
          <div className="modal-info-grid">
            <div>
              <span className="info-label">Teléfono</span>
              <p className="info-value">{cliente.telefono}</p>
            </div>
            <div>
              <span className="info-label">Correo</span>
              <p className="info-value">{cliente.correo}</p>
            </div>
          </div>

          <hr className="divider" />

          <h3 style={{ marginBottom: "1rem", color: "#111827" }}>Pedidos asociados</h3>
          
          {cliente.pedidos.length > 0 ? (
            <div className="table-wrapper">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Pedido</th>
                    <th>Fecha</th>
                    <th>Total</th>
                    <th>Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {cliente.pedidos.map((pedido) => (
                    <tr key={pedido.id}>
                      <td><strong>{pedido.id}</strong></td>
                      <td>{pedido.fecha}</td>
                      <td>{pedido.total}</td>
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
            <p className="empty-text-small">Este cliente aún no tiene pedidos registrados.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ClienteDetalle;