import { useState } from "react";

// Definimos los pasos del pedido
const PASOS = [
  { id: "Pendiente", label: "Pedido recibido", icon: "📦" },
  { id: "En proceso", label: "En preparación", icon: "🎨" },
  { id: "Enviado", label: "En camino", icon: "🚚" },
  { id: "Entregado", label: "Entregado", icon: "✅" }
];

function PedidoDetalleAdmin({ pedido, onClose, onUpdateStatus }) {
  // Buscamos el índice del estado actual
  const indiceActual = PASOS.findIndex(p => p.id === pedido.estado);
  // Si no lo encuentra (por algún error), lo ponemos en 0
  const pasoActualIndex = indiceActual !== -1 ? indiceActual : 0;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content seguimiento-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>

        <div className="seguimiento-header">
          <h2>Pedido {pedido.id}</h2>
          <p>Cliente: <strong>{pedido.cliente}</strong> | Total: <strong>{pedido.total}</strong></p>
        </div>

        {/* --- LÍNEA DE TIEMPO ANIMADA (ESTILO MERCADO LIBRE) --- */}
        <div className="timeline-container">
          <div className="timeline-track">
            {/* La barra que se va llenando */}
            <div 
              className="timeline-progress" 
              style={{ width: `${(pasoActualIndex / (PASOS.length - 1)) * 100}%` }}
            ></div>
            
            {/* Los círculos (pasos) */}
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

        {/* --- SELECTOR PARA ACTUALIZAR ESTADO --- */}
        <div className="actualizar-estado-section">
          <h3>Actualizar estado del pedido</h3>
          <p className="helper-text">Selecciona el nuevo estado para notificar al cliente.</p>
          
          <div className="estado-buttons">
            {PASOS.map((paso) => (
              <button
                key={paso.id}
                className={`btn-estado ${pedido.estado === paso.id ? 'current' : ''}`}
                onClick={() => onUpdateStatus(pedido.id, paso.id)}
                disabled={pedido.estado === paso.id}
              >
                {paso.label}
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

export default PedidoDetalleAdmin;