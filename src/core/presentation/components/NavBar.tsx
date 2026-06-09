import {useState} from "react";
import ReactDOM from "react-dom";
import {NavLink, useHistory} from "react-router-dom";
import "./Navbar.css";

const Navbar: React.FC = () => {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const history = useHistory();
  const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
  const esAdmin = usuario?.rol === 'admin';

  const abrirCerrarMenu = () => {
    setMenuAbierto((prev) => !prev);
  };

  const cerrarSesion = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    setMenuAbierto(false);
    window.location.href = "/login";
  };

  return (
    <div className="header-container">
      <img
        src="/logoMuniDigitalBlanco.png"
        className="home-logo"
        alt="Logo Municipalidad"
      />

      <nav className="nav-menu">
        <NavLink to="/home">Inicio</NavLink>
        <NavLink to="/tramites">Trámites</NavLink>
        <NavLink to="/oficinas">Oficinas</NavLink>
        <NavLink to="/faq">Preguntas frecuentes</NavLink>
        <NavLink to="/mis-reservas">Mis Reservas</NavLink>
      </nav>

      <div className="user-menu-container">
        <button
          type="button"
          className="user-avatar-wrapper"
          onClick={abrirCerrarMenu}
        >
          <img
            src="/user-default.png"
            alt="Usuario"
            className="user-avatar-img"
          />
        </button>
      </div>

      {menuAbierto &&
        ReactDOM.createPortal(
          <div className="user-dropdown">
            <button type="button" className="dropdown-item">
              Mi perfil
            </button>

            {esAdmin && (
              <button
                type="button"
                className="dropdown-item"
                onClick={() => {
                  history.push('/admin/oficinas');
                  setMenuAbierto(false);
                }}
              >
                Administrar Oficinas
              </button>
            )}

            <button
              type="button"
              className="dropdown-item logout"
              onClick={cerrarSesion}
            >
              Cerrar sesión
            </button>
          </div>,
          document.body
        )}
    </div>
  );
};

export default Navbar;