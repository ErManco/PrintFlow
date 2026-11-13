const PASOS = [
  { id: "Pendiente", label: "Pedido recibido", icon: "📦" },
  { id: "En proceso", label: "En preparación", icon: "🎨" },
  { id: "Enviado", label: "En camino", icon: "🚚" },
  { id: "Entregado", label: "Entregado", icon: "✅" }
];

function PedidoDetalleCliente({ pedido, onClose }) {
  const indiceActual = PASOS.findIndex(p => p.id === pedido.estado);
  const pasoActualIndex = indiceActual !== -1 ? indiceActual : 0;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content seguimiento-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>

        <div className="seguimiento-header">
          <h2>Pedido {pedido.id}</h2>
          <p>Total: <strong>{pedido.total}</strong> | Fecha: {pedido.fecha}</p>
        </div>

        {/* La barra animada */}
        <div className="timeline-container">
          <div className="timeline-track">
            <div 
              className="timeline-progress" 
              style={{ width: `${(pasoActualIndex / (PASOS.length - 1)) * 100}%` }}
            ></div>
            
            {PASOS.map((paso, index) => {
              const completado = index <= pasoActualIndex;
              const activo = index === pasoActualIndex;
              
              return (
                <div key={paso.id} className={`timeline-step ${completado ? 'completado' : ''} ${activo ? 'activo' : ''}`}>
                  <div className="step-icon">
                    {completado ? paso.icon : <div className="step-dot"></div>}
                  </div>
                  <span className="step-label">{paso.label}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mensaje según el estado */}
        <div className="cliente-status-message">
          {pedido.estado === "Pendiente" && <p>⏳ Estamos revisando tu pedido. Te avisaremos pronto.</p>}
          {pedido.estado === "En proceso" && <p>🎨 ¡Manos a la obra! Estamos preparando tus playeras.</p>}
          {pedido.estado === "Enviado" && <p>🚚 Tu pedido va en camino. ¡Prepárate para recibirlo!</p>}
          {pedido.estado === "Entregado" && <p>✅ Tu pedido ha sido entregado. ¡Gracias por tu compra!</p>}
        </div>

      </div>
    </div>
  );
}

export default PedidoDetalleCliente;