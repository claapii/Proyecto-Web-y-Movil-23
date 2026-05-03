import {
  IonPage,
  IonContent,
  IonHeader,
  IonToolbar
} from '@ionic/react';
import './Home.css';
import { NavLink } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <IonPage>

      {/* HEADER */}
      <IonHeader>
        <IonToolbar className="toolbar">
          <div className="header-container">
            <img src="/logoMuniDigitalBlanco.png" className="home-logo" />
          
            <nav className="nav-menu">
              <NavLink to="/Home">Inicio</NavLink>
              <NavLink to="/Tramites">Trámites</NavLink>
              <NavLink to="/Servicios">Servicios</NavLink>
              <NavLink to="/Oficinas">Oficinas</NavLink>
              <NavLink to="/FAQ">Preguntas frecuentes</NavLink>
            </nav>
          </div>
        </IonToolbar>
      </IonHeader>

      <IonContent>

        {/* 🔴 BANNER ENCUESTA */}
        <div className="banner">
          <div className="banner-text">
            <h1>ENCUESTA PARA MEJORAR EL RENDIMIENTO DE LA PÁGINA</h1>
            <button className="banner-btn">RESPONDE AQUÍ</button>
          </div>
          <img src="/encuesta.png" className="banner-img" />          
        </div>

        {/* 🔵 CARDS */}
        <div className="cards">

          <div className="card">
            <div className="icon-circle">📅</div>
            <h3>LICENCIAS DE CONDUCIR</h3>
            <button className="card-btn">AGENDA ACÁ</button>
          </div>

          <div className="card">
            <div className="icon-circle">🏢</div>
            <h3>NUESTRAS OFICINAS</h3>
            <button className="card-btn">VER AQUÍ</button>
          </div>

          <div className="card">
            <div className="icon-circle">📞</div>
            <h3>CONTÁCTANOS</h3>
            <p className="phone">600 329 932</p>
          </div>

        </div>

      </IonContent>
    </IonPage>
  );
};

export default Home;