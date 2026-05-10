import {
  IonPage,
  IonContent,
  IonHeader,
  IonToolbar,
  IonButton
} from '@ionic/react';

import './Tramites.css';

import NavBar from "../components/NavBar";

/*
 * Página de trámites municipales.
 * Permite visualizar los principales
 * trámites disponibles dentro de la
 * plataforma municipal.
*/

const Tramites: React.FC = () => {
  return (
    <IonPage>

      {/*Header superior reutilizable*/}
      <IonHeader>

        <IonToolbar className="toolbar">

          <NavBar />

        </IonToolbar>

      </IonHeader>

      <IonContent>

        {/*Sección principal*/}
        <section className="tramites-hero">

          <div className="tramites-hero-text">

            <h1>
              Trámites Municipales
            </h1>

            <p>
              En esta sección podrás encontrar
              información sobre los principales
              trámites disponibles para la comunidad.
            </p>

          </div>

        </section>

        {/*Contenedor de trámites*/}
        <section className="tramites-container">

          <h2>
            Trámites disponibles
          </h2>

          {/*Grilla de trámites*/}
          <div className="tramites-grid">

            {/*Trámite 1*/}
            <div className="tramite-card">

              {/*Icono representativo*/}
              <div className="tramite-icon">
                🪪
              </div>

              <h3>
                Licencia de conducir
              </h3>

              <p>
                Solicita o renueva tu licencia
                de conducir de forma simple.
              </p>

              {/*Navegación al detalle*/}
              <IonButton
                routerLink="/detalle/1"
                routerDirection="forward"
                className="tramite-btn"
              >
                Ver Trámite
              </IonButton>

            </div>

            {/*Trámite 2*/}
            <div className="tramite-card">

              <div className="tramite-icon">
                🛣️
              </div>

              <h3>
                Permiso de circulación
              </h3>

              <p>
                Revisa la información necesaria
                para permisos de circulación.
              </p>

              <IonButton
                routerLink="/detalle/2"
                routerDirection="forward"
                className="tramite-btn"
              >
                Ver trámite
              </IonButton>

            </div>

            {/*Trámite 3*/}
            <div className="tramite-card">

              <div className="tramite-icon">
                📄
              </div>

              <h3>
                Certificados médicos
              </h3>

              <p>
                Obtén certificados y documentos
                médicos.
              </p>

              <IonButton
                routerLink="/detalle/3"
                routerDirection="forward"
                className="tramite-btn"
              >
                Ver trámite
              </IonButton>

            </div>

            {/*Trámite 4*/}
            <div className="tramite-card">

              <div className="tramite-icon">
                🚗
              </div>

              <h3>
                Inscripción patente
              </h3>

              <p>
                Solicita los documentos o información
                acerca de la inscripción de patente.
              </p>

              <IonButton
                routerLink="/detalle/4"
                routerDirection="forward"
                className="tramite-btn"
              >
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