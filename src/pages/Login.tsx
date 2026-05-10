import {
  IonPage,
  IonContent,
  IonInput,
  IonButton,
  IonItem
} from '@ionic/react';

import './Login.css';

/*
 * Página principal de inicio de sesión.
 * Permite acceder al sistema mediante:
 * - correo y contraseña
 * - autenticación con ClaveÚnica
 * 
 * También incluye acceso al registro
 * de nuevos usuarios.
*/

const Login: React.FC = () => {
  return (
    <IonPage>

      <IonContent fullscreen>

        {/*Contenedor principal centrado*/}
        <div className="login-wrapper">

          {/*Caja principal de autenticación*/}
          <div className="login-box">

            {/*Logo institucional*/}
            <img
              src="/logoMuniDigital.png"
              className="login-logo"
            />

            {/*Título de bienvenida*/}
            <h2>
              Inicia sesión con tu cuenta
            </h2>

            {/*Campo correo electrónico*/}
            <IonItem>

              <IonInput
                placeholder="Correo electrónico"
              />

            </IonItem>

            {/*Campo contraseña*/}
            <IonItem>

              <IonInput
                type="password"
                placeholder="Contraseña"
              />

            </IonItem>

            {/*Botón de acceso principal*/}
            <IonButton
              expand="block"
              className="primary-btn"
              routerLink="/home"
            >
              Iniciar sesión
            </IonButton>

            {/*Recuperación de contraseña*/}
            <p className="link">

              ¿Olvidaste tu contraseña?

            </p>

            {/*Acceso mediante ClaveÚnica*/}
            <IonButton
              expand="block"
              className="dark-btn"
              routerLink='/clave-unica'
            >
              Inicia sesión con clave única
            </IonButton>

            {/*Registro de nuevos usuarios*/}
            <IonButton
              expand="block"
              fill="outline"
              routerLink='/register'
            >
              Crear cuenta nueva
            </IonButton>

            {/*Información de contacto*/}
            <p className="contacto">

              Contáctanos al 600 329 932

            </p>

          </div>

        </div>

      </IonContent>

    </IonPage>
  );
};

export default Login;