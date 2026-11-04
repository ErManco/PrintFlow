import { Link, NavLink } from "react-router-dom";

function Header() {
  return (
    <header>
      <div className="header-left">
        <Link to="/" className="logo">
          <div className="logo-icon">📄</div>
          PrintFlow
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
            <li><NavLink to="/pedidos">Mis pedidos</NavLink></li>
            <li><NavLink to="/contacto">Contacto</NavLink></li>
          </ul>
        </nav>
      </div>
      <div className="header-right">
        <a href="#" className="header-link">Estudio de impresión creativa</a>
        <button className="btn-primary">Iniciar sesión</button>
      </div>
    </header>
  );
}

export default Header;