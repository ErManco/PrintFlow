import { useNavigate } from "react-router-dom";
import { useCarrito } from "../context/CarritoContext";
import { useAuth } from "../context/AuthContext";
import { pedidos as pedidosDB } from "../data/pedidos"; // Simulamos la BD de pedidos

function Carrito() {
  const { carrito, eliminarDelCarrito, total, vaciarCarrito } = useCarrito();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handlePagar = () => {
    if (!user) {
      alert("Debes iniciar sesión para comprar.");
      return navigate("/login");
    }

    // Simulamos que se genera el pedido en la Base de Datos
    const nuevoPedido = {
      id: `PED-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
      fecha: new Date().toISOString().split('T')[0],
      cliente: user.name,
      total: `$${total}.00`,
      estado: "Pendiente",
    };

    // Lo agregamos a nuestra "base de datos" local de pedidos
    pedidosDB.push(nuevoPedido); 
    
    // Vaciamos el carrito y mandamos al usuario a sus pedidos
    vaciarCarrito();
    alert("¡Pago exitoso! Tu pedido ha sido registrado.");
    navigate("/mis-pedidos");
  };

  if (carrito.length === 0) {
    return (
      <main className="empty-state">
        <div className="empty-icon-container">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
          </svg>
        </div>
        <h3 className="empty-title">Tu carrito está vacío</h3>
        <p className="empty-text">Parece que aún no has agregado ninguna playera.</p>
        <button className="btn-primary" style={{ marginTop: "1.5rem" }} onClick={() => navigate("/catalogo")}>
          Ir al catálogo
        </button>
      </main>
    );
  }

  return (
    <main style={{ maxWidth: "800px", margin: "0 auto" }}>
      <div className="catalog-header">
        <h1>Tu Carrito</h1>
      </div>

      <div className="table-container" style={{ marginBottom: "2rem" }}>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Producto</th>
              <th>Talla / Color</th>
              <th>Precio</th>
              <th>Cant.</th>
              <th>Subtotal</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {carrito.map((item) => (
              <tr key={item.itemId}>
                <td style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                  <img src={item.imagen} alt={item.titulo} style={{ width: "40px", height: "40px", objectFit: "cover", borderRadius: "4px" }} />
                  <strong>{item.titulo}</strong>
                </td>
                <td>{item.talla} {item.color ? `| ${item.color}` : ''}</td>
                <td>${item.precio}</td>
                <td>{item.cantidad}</td>
                <td><strong>${item.precio * item.cantidad}</strong></td>
                <td>
                  <button className="btn-logout" onClick={() => eliminarDelCarrito(item.itemId)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "#f9fafb", padding: "1.5rem", borderRadius: "12px" }}>
        <h2 style={{ fontSize: "1.5rem" }}>Total: <span style={{ color: "#4f46e5" }}>${total}.00 MXN</span></h2>
        <button className="btn-primary btn-large" onClick={handlePagar}>Proceder al Pago</button>
      </div>
    </main>
  );
}

export default Carrito;