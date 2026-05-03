import {
  IonPage, IonContent, IonInput, IonButton, IonItem
} from '@ionic/react';

import './Login.css';

const Login: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="login-wrapper">
          <div className="login-box">

            <img src="/logoMuniDigital.png" className="login-logo" />

            <h2>Inicia sesión con tu cuenta</h2>

            <IonItem>
              <IonInput placeholder="Correo electrónico" />
            </IonItem>

            <IonItem>
              <IonInput type="password" placeholder="Contraseña" />
            </IonItem>

            <IonButton expand="block" className="primary-btn" routerLink="/Home">
              Iniciar sesión
            </IonButton>

            <p className="link">¿Olvidaste tu contraseña?</p>

            <IonButton expand="block" className="dark-btn">
              Inicia sesión con clave única
            </IonButton>

            <IonButton expand="block" fill="outline">
              Crear cuenta nueva
            </IonButton>

            <p className="contacto">Contáctanos al 600 329 932</p>
          </div>
        </div>

      </IonContent>
    </IonPage>
  );
};

export default Login;