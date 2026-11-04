import { useState } from "react";
import { clientes as clientesData } from "../data/clientes";
import ClienteDetalle from "../components/ClienteDetalle";

function Clientes() {
  const [busqueda, setBusqueda] = useState("");
  const [clienteSeleccionado, setClienteSeleccionado] = useState(null);

  // Lógica del buscador (CA2 y CA4)
  const clientesFiltrados = clientesData.filter((cliente) => {
    const term = busqueda.toLowerCase();
    return (
      cliente.nombre.toLowerCase().includes(term) ||
      cliente.telefono.includes(term) ||
      cliente.correo.toLowerCase().includes(term)
    );
  });

  return (
    <main>
      {/* Encabezado */}
      <div className="catalog-header">
        <span className="badge-collection">ADMINISTRACIÓN</span>
        <h1>Directorio de clientes</h1>
        <p>Consulta la información de contacto y el historial de compras de tus clientes.</p>
      </div>

      {/* Buscador */}
      <div className="toolbar search-toolbar">
        <div className="search-input-wrapper">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Buscar por nombre, teléfono o correo..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="search-input"
          />
        </div>
        <div className="toolbar-right">
          {clientesFiltrados.length} cliente{clientesFiltrados.length !== 1 && "s"} encontrado{clientesFiltrados.length !== 1 && "s"}
        </div>
      </div>

      {/* Listado de clientes */}
      {clientesFiltrados.length > 0 ? (
        <div className="clientes-grid">
          {clientesFiltrados.map((cliente) => (
            <div 
              key={cliente.id} 
              className="cliente-card"
              onClick={() => setClienteSeleccionado(cliente)}
            >
              <div className="cliente-avatar">
                {cliente.nombre.charAt(0).toUpperCase()}
              </div>
              <div className="cliente-info">
                <h3>{cliente.nombre}</h3>
                <p>📞 {cliente.telefono}</p>
                <p>✉️ {cliente.correo}</p>
              </div>
              <div className="cliente-pedidos-count">
                {cliente.pedidos.length} pedido{cliente.pedidos.length !== 1 && "s"}
              </div>
            </div>
          ))}
        </div>
      ) : (
        // CA4 - Mensaje cuando no hay coincidencias
        <div className="empty-state">
          <div className="empty-icon-container">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
          </div>
          <h3 className="empty-title">No se encontraron clientes</h3>
          <p className="empty-text">No hay clientes que coincidan con "{busqueda}". Intenta con otro término.</p>
        </div>
      )}

      {/* Modal de detalle (CA3) */}
      {clienteSeleccionado && (
        <ClienteDetalle 
          cliente={clienteSeleccionado} 
          onClose={() => setClienteSeleccionado(null)} 
        />
      )}
    </main>
  );
}

export default Clientes;