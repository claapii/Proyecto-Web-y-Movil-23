import {
  IonPage,
  IonContent,
  IonHeader,
  IonToolbar,
  IonButton
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
            <img src="/logoMuniDigitalBlanco.png" className="home-logo"/>

            <nav className="nav-menu">
              <NavLink to="/home">Inicio</NavLink>
              <NavLink to="/tramites">Trámites</NavLink>
              <NavLink to="/oficinas">Oficinas</NavLink>
              <NavLink to="/faq">Preguntas frecuentes</NavLink>
            </nav>

          </div>
        </IonToolbar>
      </IonHeader>

      <IonContent>

        {/* 🔴 BANNER */}
        <div className="banner">

          <div className="banner-text">

            <h1>
              ENCUESTA PARA MEJORAR EL
              RENDIMIENTO DE LA PÁGINA
            </h1>

            <IonButton className="banner-btn">
              RESPONDE AQUÍ
            </IonButton>

          </div>

          <img
            src="/encuesta.png"
            className="banner-img"
          />

        </div>

        {/* 🔵 CARDS */}
        <div className="cards">

          {/* CARD 1 */}
          <div className="card">

            <div className="icon-circle">
              📅
            </div>

            <h3>LICENCIAS DE CONDUCIR</h3>

            <IonButton className="card-btn" routerLink='/detalle/1'>
              AGENDA ACÁ
            </IonButton>

          </div>

          {/* CARD 2 */}
          <div className="card">

            <div className="icon-circle">
              🏢
            </div>

            <h3>NUESTRAS OFICINAS</h3>

            <IonButton className="card-btn">
              VER AQUÍ
            </IonButton>

          </div>

          {/* CARD 3 */}
          <div className="card">

            <div className="icon-circle">
              📞
            </div>

            <h3>CONTÁCTANOS</h3>

            <p className="phone">
              600 329 932
            </p>

          </div>

        </div>

      </IonContent>

    </IonPage>
  );
};

export default Home;