import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCarrito } from "../context/CarritoContext";
// Importamos ambas imágenes
import logoIcono from "../assets/LogoPrintFlow3.png"; 
import logoTexto from "../assets/LogoPrintFlow2.png";

function Header() {
  const { user, logout } = useAuth();
  const { carrito } = useCarrito();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const totalItems = carrito.reduce((acc, item) => acc + item.cantidad, 0);

  return (
    <header>
      <div className="header-left">
        {/* Contenedor del Logo con las dos imágenes */}
        <Link to="/" className="logo">
          <img src={logoIcono} alt="PrintFlow Icono" className="logo-img-icono" />
          <img src={logoTexto} alt="PrintFlow" className="logo-img-texto" />
        </Link>
        
        <nav>
          <ul>
            <li><NavLink to="/">Inicio</NavLink></li>
            <li>
              <NavLink to="/catalogo" className={({ isActive }) => isActive ? "active" : ""}>
                Catálogo
              </NavLink>
            </li>
            <li><NavLink to="/personalizar">Personalizar</NavLink></li>

            {user?.role === "admin" && (
              <>
                <li><NavLink to="/pedidos">Gestión de Pedidos</NavLink></li>
                <li><NavLink to="/clientes">Clientes</NavLink></li>
                <li><NavLink to="/admin/productos">Agregar Playera</NavLink></li>
              </>
            )}

            {user?.role === "client" && (
              <li><NavLink to="/mis-pedidos">Mis pedidos</NavLink></li>
            )}

            <li><NavLink to="/contacto">Contacto</NavLink></li>
          </ul>
        </nav>
      </div>

      <div className="header-right">
        <Link to="/carrito" className="cart-icon-link" title="Ver carrito">
          🛒
          {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
        </Link>

        {user ? (
          <div className="user-info">
            <span>Hola, <strong>{user.name}</strong></span>
            <button className="btn-logout" onClick={handleLogout}>Cerrar sesión</button>
          </div>
        ) : (
          <>
            <Link to="/registro" className="header-link" style={{ marginRight: "1rem" }}>
              Registrarse
            </Link>
            <Link to="/login">
              <button className="btn-primary">Iniciar sesión</button>
            </Link>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;