import {
  IonPage,
  IonContent,
  IonItem,
  IonInput,
  IonButton
} from '@ionic/react';

import './Register.css';

/*
 * Página de registro de usuarios.
 * Permite crear una nueva cuenta
 * dentro de la plataforma municipal.
*/

const Register: React.FC = () => {
  return (
    <IonPage>

      <IonContent fullscreen>

        {/*Contenedor principal centrado*/}
        <div className="register-wrapper">

          {/*Caja principal de registro*/}
          <div className="register-box">

            {/*Logo institucional*/}
            <img
              src="/logoMuniDigital.png"
              className="register-logo"
            />

            {/*Título principal*/}
            <h2>
              Crear cuenta
            </h2>

            {/*Campo nombre*/}
            <IonItem>

              <IonInput
                placeholder="Nombre"
              />

            </IonItem>

            {/*Campo apellido*/}
            <IonItem>

              <IonInput
                placeholder="Apellido"
              />

            </IonItem>

            {/*Campo correo electrónico*/}
            <IonItem>

              <IonInput
                placeholder="Correo electrónico"
              />

            </IonItem>

            {/*Campo RUT*/}
            <IonItem>

              <IonInput
                placeholder="RUT"
              />

            </IonItem>

            {/*Campo contraseña*/}
            <IonItem>

              <IonInput
                type="password"
                placeholder="Contraseña"
              />

            </IonItem>

            {/*Confirmación de contraseña*/}
            <IonItem>

              <IonInput
                type="password"
                placeholder="Confirmar contraseña"
              />

            </IonItem>

            {/*Botón de registro*/}
            <IonButton
              expand="block"
              className="primary-btn"
              routerLink='/home'
            >
              Registrarse
            </IonButton>

          </div>

        </div>

      </IonContent>

    </IonPage>
  );
};

export default Register;