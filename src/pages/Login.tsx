import {
  IonPage,
  IonContent,
  IonInput,
  IonButton,
  IonItem
} from '@ionic/react';

import './Login.css';
import { useState } from 'react';
import { useHistory } from 'react-router';
import { loginUsuario } from "../services/authService"; //Manejo de token

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

  const history = useHistory();
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = async () => {

    try {

      const response = await loginUsuario(
        correo,
        password
      );

      localStorage.setItem(
        "token",
        response.token
      );

      alert("Login exitoso");

      history.push("/home");

    } catch (error) {

      alert("Credenciales incorrectas");

      console.error(error);
    }
  };

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
                onIonChange={(e) => setCorreo(e.detail.value!)}
              />
            </IonItem>

            {/*Campo contraseña*/}
            <IonItem>
              <IonInput
                type="password"
                placeholder="Contraseña"
                onIonChange={(e) => setPassword(e.detail.value!)}
              />
            </IonItem>

            {/*Botón de acceso principal*/}
            <IonButton
              expand="block"
              className="primary-btn"
              onClick={handleLogin}
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