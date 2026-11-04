import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer>
      <div className="footer-left">
        <Link to="/" className="footer-brand">
          <div className="logo-icon" style={{ width: 20, height: 20, fontSize: "0.7rem" }}>📄</div>
          PrintFlow
        </Link>
        <span>Ideas que se llevan.</span>
      </div>
      <div className="footer-right">© 2026 PrintFlow</div>
    </footer>
  );
}

export default Footer;