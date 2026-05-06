import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonContent,
  IonButton
} from "@ionic/react";

import "./detalle.css";
import { NavLink } from "react-router-dom";

const Detalle: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className="toolbar">
          <div className="header-container">
            <img src="/logoMuniDigitalBlanco.png" alt="logo" className="home-logo" />

            <nav className="nav-menu">
                <NavLink to="/home">Inicio</NavLink>
                <NavLink to="/tramites">Trámites</NavLink>
                <NavLink to="/servicios">Servicios</NavLink>
                <NavLink to="/oficinas">Oficinas</NavLink>
                <NavLink to="/faq">Preguntas frecuentes</NavLink>
            </nav>
          </div>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <div className="detalle-container">

          {/* IZQUIERDA */}
          <div className="detalle-info">
            <h1>LICENCIA DE CONDUCIR</h1>

            <h3>DESCRIPCIÓN</h3>
            <p>
              Este trámite permite solicitar o renovar la licencia de conducir en la municipalidad.
            </p>

            <h3>INFORMACIÓN ADICIONAL</h3>
            <p>Duración estimada: 30 minutos</p>
            <p>Modalidad: Presencial</p>
            <p>Ubicación: Oficina Municipal</p>
          </div>

          {/* DERECHA */}
          <div className="detalle-card">
            <h3>REQUISITOS</h3>

            <div className="requisitos">
              <div className="req-item">
                <div className="circle">18+</div>
                <p>Mayor de 18 años</p>
              </div>

              <div className="req-item">
                <div className="circle"><img src="/cedula.png" alt="Cédula" className="req-img" /></div>
                <p>Cédula vigente</p>
              </div>

              <div className="req-item">
                <div className="circle">🩺</div>
                <p>Examen médico aprobado</p>
              </div>
            </div>

                <IonButton routerLink= "/horarios">
                Ver horarios
                </IonButton>
          </div>

        </div>
      </IonContent>
    </IonPage>
  );
};

export default Detalle;