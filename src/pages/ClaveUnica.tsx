import {
  IonPage,
  IonContent,
  IonInput,
  IonButton
} from '@ionic/react';

import './ClaveUnica.css';

/*
 * Página de autenticación mediante ClaveÚnica.
 * Simula el acceso gubernamental utilizado en Chile
 * para autenticación de usuarios.
*/

const ClaveUnica: React.FC = () => {
  return (
    <IonPage>

      <IonContent fullscreen>

        {/*Contenedor principal centrado*/}
        <div className="cu-container">

          {/*Tarjeta principal de autenticación*/}
          <div className="cu-card">

            {/*Barra superior decorativa*/}
            <div className="cu-topbar">
              <div className="blue"></div>
              <div className="red"></div>
            </div>

            {/*Logo ClaveÚnica*/}
            <img
              src="/logoClaveUnica.png"
              className="cu-logo"
            />

            {/*Título principal*/}
            <h1 className="cu-title">
              ClaveÚnica
            </h1>

            {/*Subtítulo descriptivo*/}
            <p className="cu-subtitle">
              Requiere autenticación
            </p>

            {/*Campo RUN*/}
            <IonInput
              className="cu-input"
              placeholder="Ingresa tu RUN"
            />

            {/*Campo contraseña*/}
            <IonInput
              className="cu-input"
              type="password"
              placeholder="Ingresa tu Clave"
            />

            {/*Recuperación de acceso*/}
            <p className="cu-link">
              ¿Olvidaste tu ClaveÚnica?
            </p>

            {/*Botón de acceso*/}
            <IonButton
              expand="block"
              className="cu-button"
              routerLink="/home"
            >
              Continuar
            </IonButton>

            {/*Footer informativo*/}
            <div className="cu-footer">
              <span>Gobierno de Chile</span>
              <span>gob.cl</span>
            </div>

          </div>

        </div>

      </IonContent>

    </IonPage>
  );
};

export default ClaveUnica;