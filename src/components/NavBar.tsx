import { NavLink } from "react-router-dom";
import "./Navbar.css";

const Navbar: React.FC = () => {
  return (
    <div className="header-container">

      <img
        src="/logoMuniDigitalBlanco.png"
        className="home-logo"
      />

      <nav className="nav-menu">
        <NavLink to="/home">Inicio</NavLink>

        <NavLink to="/tramites">Trámites</NavLink>

        <NavLink to="/oficinas">Oficinas</NavLink>

        <NavLink to="/faq">Preguntas frecuentes</NavLink>
      </nav>

    </div>
  );
};

export default Navbar;