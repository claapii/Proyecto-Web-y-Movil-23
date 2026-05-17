import {
  IonPage,
  IonContent,
  IonItem,
  IonInput,
  IonButton
} from '@ionic/react';

import './Register.css';
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { registerUsuario } from "../services/authService";

/*
 * Página de registro de usuarios.
 * Permite crear una nueva cuenta
 * dentro de la plataforma municipal.
*/

const Register: React.FC = () => {
  const history = useHistory();

  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [correo, setCorreo] = useState("");
  const [rut, setRut] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = async () => {

    if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }

    try {

      await registerUsuario({
        nombre,
        apellido,
        correo,
        rut,
        password
      });

      alert("Usuario registrado correctamente");

      history.push("/");

    } catch (error) {

      console.error(error);

      alert("Error al registrar usuario");
    }
  };

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
                onIonChange={(e) => setNombre(e.detail.value!)}
              />
            </IonItem>

            {/*Campo apellido*/}
            <IonItem>
              <IonInput
                placeholder="Apellido"
                onIonChange={(e) => setApellido(e.detail.value!)}
              />
            </IonItem>

            {/*Campo correo electrónico*/}
            <IonItem>
              <IonInput
                placeholder="Correo electrónico"
                onIonChange={(e) => setCorreo(e.detail.value!)}
              />
            </IonItem>

            {/*Campo RUT*/}
            <IonItem>
              <IonInput
                placeholder="RUT"
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

            {/*Confirmación de contraseña*/}
            <IonItem>
              <IonInput
                type="password"
                placeholder="Confirmar contraseña"
                onIonChange={(e) => setConfirmPassword(e.detail.value!)}
              />
            </IonItem>

            {/*Botón de registro*/}
            <IonButton
              expand="block"
              className="primary-btn"
              onClick={handleRegister}
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