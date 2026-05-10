import {
  IonPage,
  IonContent,
  IonHeader,
  IonToolbar,
  IonButton
} from '@ionic/react';

import './Oficinas.css';
import NavBar from "../components/NavBar";

const Oficinas: React.FC = () => {
  return (
    <IonPage>

      {/* HEADER */}
      <IonHeader>
        <IonToolbar className="toolbar">
          <NavBar />
        </IonToolbar>
      </IonHeader>

      <IonContent>

        {/* SECCIÓN PRINCIPAL */}
        <section className="oficinas-hero">
          <div className="oficinas-hero-text">
            <h1>Nuestras Oficinas</h1>
            <p>
              Encuentra aquí la información de atención, ubicación y horarios de las
              principales oficinas municipales.
            </p>
          </div>
        </section>

        {/* LISTA DE OFICINAS */}
        <section className="oficinas-container">

          <h2>Oficinas disponibles</h2>

          <div className="oficinas-grid">

            <div className="oficina-card">
              <div className="oficina-icon">🏛️</div>

              <h3>Oficina Municipal Central</h3>

              <p>
                Atención general para trámites, consultas y orientación ciudadana.
              </p>

              <div className="oficina-info">
                <p><strong>Dirección:</strong> Av. Central 123</p>
                <p><strong>Horario:</strong> Lunes a viernes, 08:00 a 14:00 hrs</p>
                <p><strong>Teléfono:</strong> 600 329 932</p>
              </div>

              <IonButton className="oficina-btn">
                Ver ubicación
              </IonButton>
            </div>

            <div className="oficina-card">
              <div className="oficina-icon">🚗</div>

              <h3>Dirección de Tránsito</h3>

              <p>
                Encargada de otorgar licencias de conducir y permisos de circulación, optimizar
                los recursos, señalizar y mejorar el uso de las vías públicas. 
              </p>

              <div className="oficina-info">
                <p><strong>Dirección:</strong> Calle Tránsito 456</p>
                <p><strong>Horario:</strong> Lunes a viernes, 08:00 a 14:00 hrs</p>
                <p><strong>Teléfono:</strong> 600 329 932</p>
              </div>

              <IonButton className="oficina-btn">
                Ver ubicación
              </IonButton>
            </div>

            <div className="oficina-card">
              <div className="oficina-icon">🏥</div>

              <h3>Dirección de Salud</h3>

              <p>
                Tiene como misión controlar y supervisar la gestión de salud comunal,
                tanto en lo administrativo como en lo sanitario, por medio del diseño e
                implementación de programas comunales e instrumentos de gestión que permitan
                mejorar los procesos, acciones o distribución de recursos.
              </p>

              <div className="oficina-info">
                <p><strong>Dirección:</strong> Av. Salud 789</p>
                <p><strong>Horario:</strong> Lunes a viernes, 08:00 a 14:00 hrs</p>
                <p><strong>Teléfono:</strong> 600 329 932</p>
              </div>

              <IonButton className="oficina-btn">
                Ver ubicación
              </IonButton>
            </div>

            <div className="oficina-card">
              <div className="oficina-icon">🤝</div>

              <h3>Atención Social</h3>

              <p>
                Orientación y apoyo en beneficios sociales, programas municipales
                y ayuda comunitaria.
              </p>

              <div className="oficina-info">
                <p><strong>Dirección:</strong> Pasaje Social 321</p>
                <p><strong>Horario:</strong> Lunes a jueves, 08:00 a 14:00 hrs</p>
                <p><strong>Teléfono:</strong> 600 329 932</p>
              </div>

              <IonButton className="oficina-btn">
                Ver ubicación
              </IonButton>
            </div>

          </div>

        </section>

      </IonContent>
    </IonPage>
  );
};

export default Oficinas; 