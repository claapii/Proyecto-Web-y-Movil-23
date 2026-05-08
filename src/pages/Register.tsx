import {
  IonPage,
  IonContent,
  IonItem,
  IonInput,
  IonButton
} from '@ionic/react';

import './Register.css';

const Register: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>

        <div className="register-wrapper">

          <div className="register-box">

            <img src="/logoMuniDigital.png" className="register-logo" />

            <h2>Crear cuenta</h2>

            <IonItem>
              <IonInput placeholder="Nombre" />
            </IonItem>

            <IonItem>
              <IonInput placeholder="Apellido" />
            </IonItem>

            <IonItem>
              <IonInput placeholder="Correo electrónico" />
            </IonItem>

            <IonItem>
              <IonInput placeholder="RUT" />
            </IonItem>

            <IonItem>
              <IonInput type="password" placeholder="Contraseña" />
            </IonItem>

            <IonItem>
              <IonInput type="password" placeholder="Confirmar contraseña" />
            </IonItem>

            <IonButton expand="block" className="primary-btn" routerLink='/home'>
              Registrarse
            </IonButton>

          </div>

        </div>

      </IonContent>
    </IonPage>
  );
};

export default Register;