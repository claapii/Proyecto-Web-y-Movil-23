import {
  IonPage,
  IonContent,
  IonHeader,
  IonToolbar,
  IonButton
} from '@ionic/react';

import './Tramites.css';
import { NavLink } from 'react-router-dom';

const Tramites: React.FC = () => {
  return (
    <IonPage>

      {/* HEADER */}
      <IonHeader>
        <IonToolbar className="toolbar">
          <div className="header-container">
            <img src="/logoMuniDigitalBlanco.png" className="home-logo" />

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

        {/* SECCIÓN PRINCIPAL */}
        <section className="tramites-hero">
          <div className="tramites-hero-text">
            <h1>Trámites Municipales</h1>
            <p>
              En esta sección podrás encontrar información sobre los principales
              trámites disponibles para la comunidad.
            </p>
          </div>
        </section>

        {/* LISTA DE TRÁMITES */}
        <section className="tramites-container">

          <h2>Trámites disponibles</h2>

          <div className="tramites-grid">

            <div className="tramite-card">
              <div className="tramite-icon">🪪</div>
              <h3>Licencia de conducir</h3>
              <p>
                Solicita o renueva tu licencia de conducir de forma simple.
              </p>
              <IonButton 
                routerLink="/detalle/1" 
                routerDirection="forward"
                className="tramite-btn"
              >
                Ver Trámite
              </IonButton>
            </div>

            <div className="tramite-card">
              <div className="tramite-icon">🛣️</div>
              <h3>Permiso de circulación</h3>
              <p>
                Revisa la información necesaria para permisos de circulación.
              </p>
              <IonButton routerLink="/detalle/2" className="tramite-btn">
                Ver trámite
              </IonButton>
            </div>

            <div className="tramite-card">
              <div className="tramite-icon">📄</div>
              <h3>Certificados médicos</h3>
              <p>
                Obtén certificados y documentos médicos.
              </p>
              <IonButton routerLink="/detalle/3" className="tramite-btn">
                Ver trámite
              </IonButton>
            </div>

            <div className="tramite-card">
              <div className="tramite-icon">🚗</div>
              <h3>Inscripción patente</h3>
              <p>
                Solicita los documentos o información acerca de la inscripción de patente.
              </p>
              <IonButton routerLink="/detalle/4" className="tramite-btn">
                Ver trámite
              </IonButton>
            </div>

          </div>
        </section>

      </IonContent>
    </IonPage>
  );
};

export default Tramites;