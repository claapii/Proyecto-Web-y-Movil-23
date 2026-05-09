import {
  IonPage,
  IonContent,
  IonInput,
  IonButton
} from '@ionic/react';

import './ClaveUnica.css';

const ClaveUnica: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>

        <div className="cu-container">

          <div className="cu-card">

            <div className="cu-topbar">
              <div className="blue"></div>
              <div className="red"></div>
            </div>

            <img
              src="/LogoClaveUnica.png"
              className="cu-logo"
            />

            <h1 className="cu-title">ClaveÚnica</h1>

            <p className="cu-subtitle">
              Requiere autenticación
            </p>

            <IonInput
              className="cu-input"
              placeholder="Ingresa tu RUN"
            />

            <IonInput
              className="cu-input"
              type="password"
              placeholder="Ingresa tu Clave"
            />

            <p className="cu-link">
              ¿Olvidaste tu ClaveÚnica?
            </p>

            <IonButton expand="block" className="cu-button" routerLink='/home'>
              Continuar
            </IonButton>

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