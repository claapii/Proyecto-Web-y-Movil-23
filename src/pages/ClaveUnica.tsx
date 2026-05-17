import {
  IonPage,
  IonContent,
  IonInput,
  IonButton
} from '@ionic/react';

import { loginClaveUnica } from '../services/authService';
import { useState } from 'react';
import { useHistory } from 'react-router';
import { IonItem } from '@ionic/react';
import './ClaveUnica.css';

/*
 * Página de autenticación mediante ClaveÚnica.
 * Simula el acceso gubernamental utilizado en Chile
 * para autenticación de usuarios.
*/

const ClaveUnica: React.FC = () => {
  const history = useHistory();
  const [rut, setRut] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = async () => {

    try {

      const response = await loginClaveUnica(
        rut,
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

            {/*Campo correo electrónico*/}
            <IonItem>
              <IonInput
                placeholder="RUN"
                onIonChange={(e) => setRut(e.detail.value!)}
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

            {/*Recuperación de acceso*/}
            <p className="cu-link">
              ¿Olvidaste tu ClaveÚnica?
            </p>

            {/*Botón de acceso*/}
            <IonButton
              expand="block"
              className="cu-button"
              onClick={handleLogin}
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